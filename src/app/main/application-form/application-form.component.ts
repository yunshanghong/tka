import { Component, ElementRef, OnInit, AfterViewInit, ViewChild, OnDestroy } from '@angular/core';
import { Location } from '@angular/common';

import { EventEmitterService } from 'src/app/services/eventEmitter.service';
import { NgForm } from '@angular/forms';
import { InfoService } from 'src/app/services/info.service';
import { Router } from '@angular/router';
import { OrderService } from 'src/app/services/order.service';
import { orderModelInterface } from '../../services/order.service';

@Component({
    selector: 'app-application-form',
    templateUrl: './application-form.component.html',
    styleUrls: ["../../../styles/term.css"]
})
export class ApplicationFormComponent implements OnInit, AfterViewInit, OnDestroy {

    orderModel: orderModelInterface;

    @ViewChild('formComponent') formComponent: ElementRef;

    constructor(
        private eventEmitterService: EventEmitterService,
        private infoService: InfoService,
        private router: Router,
        private orderService: OrderService) { }

    ngOnInit() {
        // not follow the path then navigate to models
        if (!this.orderService.orderModel) {
            this.router.navigate(["/models"]);
        }

        this.orderModel = this.orderService.orderModel;

        console.log(this.orderModel);
    }

    ngAfterViewInit() {
        this.eventEmitterService.onLoadingComplete();
    }

    ngOnDestroy() {
        this.formComponent.nativeElement.remove();
    }

    onStartAgain() {
        this.router.navigate(['/models-content', this.orderService.orderModel.id])
    }

    onSubmit(form: NgForm) {
        console.log(form.value);
        console.log("submit")
        this.infoService.postPreSubmit({
            salutation: "",
            firstName: form.value.FirstName,
            lastName: form.value.LastName,
            nric: form.value.NRIC,
            mobileNo: form.value.MobileNumber,
            email: form.value.Email,
            comments: "",
            agreeSharePersonalData: true,
            receiveMarketingMaterial: false,
            contactOption: null,
            variantCode: this.orderModel.variantCode,
            terms: this.orderModel.tenure,
            brand: "TOYOTA",
            isGuaranteedCoePrice: true,
            modelCode: this.orderModel.internalModelCode,
            financialProductCode: this.orderModel.financialProductCode,
            financialProductId: this.orderModel.financialProductId,
            downPaymentPercentage: 60,
            exteriorColorConfigItemCode: "VCI109",
            interiorColorConfigItemCode: "VCI119"
        });
        this.router.navigate(['/application-submitted'])
    }
}
