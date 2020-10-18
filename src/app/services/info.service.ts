import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
const basicUrl = "https://api-uat.kinto-sg.com/kinto-api/api/";


@Injectable({ providedIn: 'root' })
export class InfoService {
	constructor(private http: HttpClient) { }

	headers = new HttpHeaders({
		'Access-Control-Allow-Origin': 'https://api-uat.kinto-sg.com',
		'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE, OPTIONS',
		'Access-Control-Max-Age': '86400'
	})

	getBanner() {
		return this.http.get(basicUrl + 'Vehicle/GetVariantDetailByGlobalCodeCategory', {
			headers: this.headers,
			params: { globalCodeCategoryName: 'Vehicle.BannerVehicle' },
		})
	}
	getFiveReasons() {
		return this.http.get(basicUrl + 'DynamicContent/GetDynamicContentByType', {
			headers: this.headers,
			params: { Type: 'Kinto.Services', ShowOnHomePage: 'false' }
		})
	}
	getTopChoices() {
		return this.http.get(basicUrl + 'Vehicle/GetVariantDetailByGlobalCodeCategory', {
			headers: this.headers,
			params: { globalCodeCategoryName: 'Vehicle.TopChoices' }
		})
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

}
