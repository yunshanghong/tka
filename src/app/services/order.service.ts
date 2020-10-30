import { Injectable } from '@angular/core';

export interface orderModelInterface {
    carName: string; // Corolla Altis
    id: string;
    variantId: string;
    financialProductId: number; // leasing id
    colorName: string; // Attitude Black Mica
    colorNumber: string; // #ffddca
    colorImage: string; // https://...iamge
    interiorName: string; // Standard
    interiorNumber: string; // base64 data
    variantName: string;  // 
    tenure: number; // 60
    securityDeposit: number; // 2000
    monthlyAmount: number; // 1000
    internalModelCode: string; //VCI191
    variantCode: string; //
    financialProductCode: string;
    exteriorColorConfigItemCode: string;
    interiorColorConfigItemCode: string;
}

@Injectable({ providedIn: 'root' })
export class OrderService {

    orderModel: orderModelInterface;

    constructor() { }


}
