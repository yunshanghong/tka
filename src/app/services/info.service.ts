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
		'accept': 'text/plain'
	})

	//#region public methods
	getDynamicContentByType(paramsObj: any) {
		return this.http.get(basicUrl + 'DynamicContent/GetDynamicContentByType', {
			headers: this.headers,
			params: paramsObj
		})
	}
	//#endregion

	//#region 1. Home
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

		const result = { ...newBanners, displayCarInfos: [...banner[0].vehicle.variants[0].vehicleConfigItems] };
		for (var key in newBanners) {
			const item = newBanners[key];
			const tempResult: any = await this.getFinance(item.id, item.variantId, item.term * 12).toPromise();
			result[key].monthlyPaymentAmount = tempResult.monthlyPaymentAmount;
		}
		return result;
	}

	async getTopChoices() {
		const choices: any = await this.http.get(basicUrl + 'Vehicle/GetVariantDetailByGlobalCodeCategory', {
			headers: this.headers,
			params: { globalCodeCategoryName: 'Vehicle.TopChoices' }
		}).toPromise();

		const result = [];
		for (var key in choices) {
			const id = choices[key].financialProducts.leasing.id;
			const variantId = choices[key].vehicle.variants[0].id;
			const leasing = choices[key].financialProducts.leasing;
			const minAmount: any = await this.getFinance(id, variantId, leasing.minTerm).toPromise();
			const defaultAmount: any = await this.getFinance(id, variantId, leasing.defaultTerm).toPromise();
			const maxAmount: any = await this.getFinance(id, variantId, leasing.maxTerm).toPromise();
			result.push({
				index: Number(key),
				displayCarImg: choices[key].vehicle.secondaryImageUrl,
				minTerm: { id: id, variantId: variantId, term: leasing.minTerm / 12, monthlyPaymentAmount: minAmount.monthlyPaymentAmount },
				defaultTerm: { id: id, variantId: variantId, term: leasing.defaultTerm / 12, monthlyPaymentAmount: defaultAmount.monthlyPaymentAmount },
				maxTerm: { id: id, variantId: variantId, term: leasing.maxTerm / 12, monthlyPaymentAmount: maxAmount.monthlyPaymentAmount },
				name: choices[key].vehicle.name
			})
		}
		return result;
	}
	getFAQ() {
		return this.http.get(basicUrl + 'FAQ/GetFaqByType', {
			headers: this.headers,
			params: { ShowOnHomePage: 'true' }
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
	//#endregion

	//#region 2.1 All Models
	getMenu(paramsObj) {
		return this.http.get(basicUrl + 'LookUp/GetGlobalCodesByCategoryName', {
			headers: this.headers,
			params: paramsObj
		})
	}

	async getAllModels() {
		const allModels = await this.http.get(basicUrl + 'LookUp/GetVehicleCategoriesByBrand', {
			headers: this.headers,
		}).toPromise();

		var newAllModels = [];
		console.log(allModels);
		for (var i in allModels) {
			if (allModels[i].category.order === 0) {
				const vehicles = allModels[i].vehicles;
				for (var j in vehicles) {
					vehicles[j].variants.sort((a: any, b: any) => (a.itemOrder > b.itemOrder) ? 1 : ((b.itemOrder > a.itemOrder) ? -1 : 0));
				}
				newAllModels = vehicles;
			}
		}
		return newAllModels;
	}

	async postModelsSearch(searchStr: String) {

		const searchModels = await this.http.post(basicUrl + 'Search/SearchModelByKeyword',
			{ "keyword": searchStr },
			{ headers: this.headers }
		).toPromise();

		for (var i in searchModels) {
			searchModels[i].variants.sort((a: any, b: any) => (a.itemOrder > b.itemOrder) ? 1 : ((b.itemOrder > a.itemOrder) ? -1 : 0));
		}
		return searchModels;
	}

	//#endregion

	//#region 2.2 Models Content

	getCarInfo(carId: string) {
		return this.http.get(basicUrl + 'Vehicle/GetDetails', {
			headers: this.headers,
			params: { Id: carId }
		}).pipe(map((data: any) => {
			data.vehicle.variants.sort((a: any, b: any) => (a.itemOrder > b.itemOrder) ? 1 : ((b.itemOrder > a.itemOrder) ? -1 : 0));
			return data;
		}))
	}

	getMonthlyAmount(carVariantId) {
		return this.http.get(basicUrl + 'Finance/GetAvailableFinancialProducts', {
			headers: this.headers,
			params: { VehicleVariantId: carVariantId }
		})
	}

	postCalcDeposit(carId: number, carVariantId: number, period: number) {
		return this.http.post(basicUrl + 'Finance/CalculateSecurityDeposit',
			{ "financialProductId": carId, "variantId": carVariantId, "tenure": period },
			{ headers: this.headers }
		);
	}

	//#endregion

	//#region 2.3 Term & Condition
	getTermCondition() {
		return this.http.get(basicUrl + 'LookUp/GetTermsAndCondition', {
			headers: this.headers,
			params: { BrandCode: '0001', Name: 'PrivacyPolicy' }
		})
	}
	//#endregion

	//#region 2.4 Application form
	postPreSubmit(postBody: Object) {
		const searchModels: any = this.http.post(basicUrl + 'QuoteRequest/LogQuoteRequest',
			postBody,
			{ headers: this.headers }
		).toPromise();

		console.log(searchModels);

		const result = this.postSubmit({
			quoteRequestId: searchModels.__zone_symbol__value.detail.quoteRequestId,
			rcoNumber: "KT0000377",
			salesmanCode: ""
		})
	}

	postSubmit(postBody: Object) {
		return this.http.post(basicUrl + 'Tkyc/SubmitApplication',
			postBody,
			{ headers: this.headers }
		)
	}
	//#endregion

	//#region 2.5 Application Submitted
	postAppNumber(postBody: Object) {
		return this.http.post(basicUrl + 'QuoteRequest/LogQuoteRequest',
			postBody,
			{ headers: this.headers })
	}
	//#endregion

	//#region 3.1 News List

	//#endregion
}
