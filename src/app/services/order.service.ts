import { Injectable } from '@angular/core';

export interface orderModelInterface {
    id: string;
    variantId: string;
}

@Injectable({ providedIn: 'root' })
export class OrderService {

    orderModel: orderModelInterface = { id: "", variantId: "" };

    constructor() { console.log("orderService init") }


}
