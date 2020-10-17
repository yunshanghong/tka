import { Injectable } from '@angular/core';
import axios from 'axios';

const basicUrl = "https://api-uat.kinto-sg.com/kinto-api/api/";


@Injectable({ providedIn: 'root' })
export class InfoService {
	constructor() { }

	getBanner() {
		return axios.get(basicUrl + 'Vehicle/GetVariantDetailByGlobalCodeCategory', {
			params: { globalCodeCategoryName: 'Vehicle.BannerVehicle' }
		})

	}
	getFiveReasons() {
		return axios.get(basicUrl + 'DynamicContent/GetDynamicContentByType', {
			params: { Type: 'Kinto.Services', ShowOnHomePage: false }
		})
	}
	getTopChoices() {
		return axios.get(basicUrl + 'Vehicle/GetVariantDetailByGlobalCodeCategory', {
			params: { globalCodeCategoryName: 'Vehicle.TopChoices' }
		})
	}
	getFAQ() {
		return axios.get(basicUrl + 'FAQ/GetFaqByType', {
			params: { ShowOnHomePage: true }
		})
	}
	getLatestPromotion() {
		return axios.get(basicUrl + 'DynamicContent/GetDynamicContentByType', {
			params: { Type: "Kinto.PromotionalContent" }
		})
	}
	getHomeImageUrl() {
		return axios.get(basicUrl + 'LookUp/GetGlobalCodesByCategoryName', {
			params: { CategoryName: "Kinto.HomeMobilityImage" }
		})
	}

}
