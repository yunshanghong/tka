import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
const basicUrl = "https://api-uat.kinto-sg.com/kinto-api/api/";


@Injectable({ providedIn: 'root' })
export class InfoService {
	constructor(private http: HttpClient) { }

	headers = new HttpHeaders({
		'Access-Control-Allow-Origin': '*',
		'Access-Control-Allow-Methods': 'GET, POST',
		'Access-Control-Allow-Headers': 'Content-Type',
		'Content-Type': 'application/json',
	})

	async getBanner() {

		const banner = await this.http.get(basicUrl + 'Vehicle/GetVariantDetailByGlobalCodeCategory', {
			headers: this.headers,
			params: { globalCodeCategoryName: 'Vehicle.BannerVehicle' },
		}).toPromise();

		const id = banner[0].financialProducts.leasing.id;
		const variantId = banner[0].vehicle.variants[0].id;
		const leasing = banner[0].financialProducts.leasing;
		const newBanners = {
			minTerm: { id: id, variantId: variantId, term: leasing.minTerm / 12 },
			defaultTerm: { id: id, variantId: variantId, term: leasing.defaultTerm / 12 },
			maxTerm: { id: id, variantId: variantId, term: leasing.maxTerm / 12 }
		}

		const result = { ...newBanners, displayCarInfos: [ ...banner[0].vehicle.variants[0].vehicleConfigItems ] };
		for (var key in newBanners) {
			const item = newBanners[key];
			const tempResult: any = await this.getFinance(item.id, item.variantId, item.term * 12).toPromise();
			result[key].monthlyPaymentAmount = tempResult.monthlyPaymentAmount;
		}
		return result;
	}
	getFiveReasons() {
		return this.http.get(basicUrl + 'DynamicContent/GetDynamicContentByType', {
			headers: this.headers,
			params: { Type: 'Kinto.Reasons', ShowOnHomePage: 'true' }
		})
	}
	getTopChoices() {
		const choices = this.http.get(basicUrl + 'Vehicle/GetVariantDetailByGlobalCodeCategory', {
			headers: this.headers,
			params: { globalCodeCategoryName: 'Vehicle.TopChoices' }
		}).pipe(map(data => {
			const newChoices = [];
			for (const key in data) {
				if (data.hasOwnProperty(key)) {
					newChoices.push({
						index: Number(key),
						displayCarImg: data[key].vehicle.secondaryImageUrl,
						id: data[key].financialProducts.leasing.id,
						tenure: data[key].financialProducts.leasing.defaultTerm,
						defaultTerm: data[key].financialProducts.leasing.defaultTerm / 12,
						maxTerm: data[key].financialProducts.leasing.maxTerm / 12,
						minTerm: data[key].financialProducts.leasing.minTerm / 12,
						variantId: data[key].vehicle.variants[0].id,
						name: data[key].vehicle.name
					});
				}
			}
			return newChoices
		}))

		const result = choices.pipe(map(data => {
			const newResult = [...data];
			for (const key in data) {
				const item = data[key];
				this.getFinance(item.id, item.variantId, item.defaultTerm).subscribe((res: { monthlyPaymentAmount: number, securityDepositAmount: number }) => {
					newResult[key].monthlyPaymentAmount = res.monthlyPaymentAmount;
				});
			}
			return newResult;
		}))

		return result;
	}
	getFAQ() {
		return this.http.get(basicUrl + 'FAQ/GetFaqByType', {
			headers: this.headers,
			params: { ShowOnHomePage: 'true' }
		})
	}
	getLatestPromotion() {
		return this.http.get(basicUrl + 'DynamicContent/GetDynamicContentByType', {
			headers: this.headers,
			params: { Type: "Kinto.PromotionalContent" }
		})
	}
	getHomeImageUrl() {
		return this.http.get(basicUrl + 'LookUp/GetGlobalCodesByCategoryName', {
			headers: this.headers,
			params: { CategoryName: "Kinto.HomeMobilityImage" }
		})
	}

	getFinance(id: number, variantId: number, defaultTerm: number) {
		return this.http.post(basicUrl + 'Finance/CalculateSecurityDeposit', {
			"financialProductId": id,
			"variantId": variantId,
			"tenure": defaultTerm
		}, { headers: this.headers })
	}
}
