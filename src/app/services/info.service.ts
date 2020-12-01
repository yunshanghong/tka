import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

const basicUrl = environment.backendUrl;

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
			minTerm: { id: id, variantId: variantId, term: leasing.termSelection[0] / 12 },
			defaultTerm: { id: id, variantId: variantId, term: leasing.termSelection[1] / 12 },
			maxTerm: { id: id, variantId: variantId, term: leasing.termSelection[2] / 12 }
		}

		const result = { ...newBanners, displayCarInfos: [...banner[0].vehicle.variants[0].vehicleConfigItems], carId: banner[0].vehicle.id, carName: banner[0].vehicle.name };
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
			const minAmount: any = await this.getFinance(id, variantId, leasing.termSelection[0]).toPromise();
			const defaultAmount: any = await this.getFinance(id, variantId, leasing.termSelection[1]).toPromise();
			const maxAmount: any = await this.getFinance(id, variantId, leasing.termSelection[2]).toPromise();
			result.push({
				index: Number(key),
				displayCarImg: choices[key].vehicle.secondaryImageUrl,
				minTerm: { id: id, variantId: variantId, term: leasing.termSelection[0] / 12, monthlyPaymentAmount: minAmount.monthlyPaymentAmount },
				defaultTerm: { id: id, variantId: variantId, term: leasing.termSelection[1] / 12, monthlyPaymentAmount: defaultAmount.monthlyPaymentAmount },
				maxTerm: { id: id, variantId: variantId, term: leasing.termSelection[2] / 12, monthlyPaymentAmount: maxAmount.monthlyPaymentAmount },
				name: choices[key].vehicle.name,
				carId: choices[key].vehicle.id,
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
	getBrandMenu() {
		return this.http.get(basicUrl + 'LookUp/GetAvailableBrand', {
			headers: this.headers
		})
	}

	getCateMenu(paramsObj) {
		return this.http.get(basicUrl + 'LookUp/GetVehicleCategoriesByBrand', {
			headers: this.headers,
			params: paramsObj
		})
	}

	async getAllModels() {
		const allModels = await this.http.get(basicUrl + 'LookUp/GetVehicleCategoriesByBrand', {
			headers: this.headers,
		}).toPromise();

		var newAllModels = [];
		for (var i in allModels) {
			const category = allModels[i].category;
			const vehicles = allModels[i].vehicles;
			for (var j in vehicles) {
				const vehicle = vehicles[j];
				vehicle.brand = category.brandCode;
				newAllModels.push(vehicle)
			}
		}
		return newAllModels;
	}

	postModelsSearch(searchStr: String) {
		return this.http.post(basicUrl + 'Search/SearchModelByKeyword',
			{ "keyword": searchStr },
			{ headers: this.headers }
		);
	}

	//#endregion

	//#region 2.2 Models Content

	getCarInfo(carId: string) {
		return this.http.get(basicUrl + 'Vehicle/GetDetails', {
			headers: this.headers,
			params: { Id: carId }
		})
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
	getTermCondition(brandCode: string) {
		return this.http.get(basicUrl + 'LookUp/GetTermsAndCondition', {
			headers: this.headers,
			params: { BrandCode: brandCode, Name: 'PrivacyPolicy' }
		})
	}
	//#endregion

	//#region 2.4 Application form
	async postPreSubmit(postBody: Object) {
		const searchModels: any = await this.http.post(basicUrl + 'QuoteRequest/LogQuoteRequest',
			postBody,
			{ headers: this.headers }
		).toPromise();

		return searchModels;
	}


	//#endregion

	//#region 2.5 Application Submitted
	postSubmit(postBody: Object) {
		return this.http.post(basicUrl + 'Tkyc/SubmitApplication',
			postBody,
			{ headers: this.headers }
		);
	}
	//#endregion

	//#region 3.2 News Content
	getNewsContent(inputId: number) {
		return this.http.get(basicUrl + 'DynamicContent/GetDynamicContentById', {
			headers: this.headers,
			params: { Id: inputId.toString() }
		})
	}
	//#endregion

	//#region 5.1 FAQs
	getAllFaqs() {
		return this.http.get(basicUrl + 'FAQ/GetFaqByType', {
			headers: this.headers,
			// params: { Id: inputId.toString() }
		})
	}

	postFaqSearch(searchStr: String) {

		return this.http.post(basicUrl + 'Search/SearchFAQByKeyword',
			{ "keyword": searchStr },
			{ headers: this.headers }
		)
	}
	//#endregion

	//#region 6.1 Contact
	postContact(postBody: Object) {

		return this.http.post(basicUrl + 'ContactUs/SubmitContactUs', postBody,
			{ headers: this.headers }
		)
	}
	//#endregion
}
