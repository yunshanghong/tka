import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
const basicUrl = "https://api-uat.kinto-sg.com/kinto-api/api/";


@Injectable({ providedIn: 'root' })
export class InfoService {
	constructor(private http: HttpClient) { }

	getBanner() {
		return this.http.get(basicUrl + 'Vehicle/GetVariantDetailByGlobalCodeCategory', {
			params: { globalCodeCategoryName: 'Vehicle.BannerVehicle' }
		})
	}
	getFiveReasons() {
		return this.http.get(basicUrl + 'DynamicContent/GetDynamicContentByType', {
			params: { Type: 'Kinto.Services', ShowOnHomePage: 'false' }
		})
	}
	getTopChoices() {
		return this.http.get(basicUrl + 'Vehicle/GetVariantDetailByGlobalCodeCategory', {
			params: { globalCodeCategoryName: 'Vehicle.TopChoices' }
		})
	}
	getFAQ() {
		return this.http.get(basicUrl + 'FAQ/GetFaqByType', {
			params: { ShowOnHomePage: 'true' }
		})
	}
	getLatestPromotion() {
		return this.http.get(basicUrl + 'DynamicContent/GetDynamicContentByType', {
			params: { Type: "Kinto.PromotionalContent" }
		})
	}
	getHomeImageUrl() {
		return this.http.get(basicUrl + 'LookUp/GetGlobalCodesByCategoryName', {
			params: { CategoryName: "Kinto.HomeMobilityImage" }
		})
	}

}
