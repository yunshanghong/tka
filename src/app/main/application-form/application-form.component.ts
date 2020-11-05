import { Component, ElementRef, OnInit, AfterViewInit, ViewChild, OnDestroy } from '@angular/core';

import { EventEmitterService } from 'src/app/services/eventEmitter.service';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { InfoService } from 'src/app/services/info.service';
import { Router } from '@angular/router';
import { OrderService } from 'src/app/services/order.service';
import { orderModelInterface } from '../../services/order.service';
import { contactNumber } from '../../shared/contactNumber';

@Component({
    selector: 'app-application-form',
    templateUrl: './application-form.component.html',
    styleUrls: ["../../../styles/term.css"]
})
export class ApplicationFormComponent implements OnInit, AfterViewInit, OnDestroy {

    numberList = contactNumber;
    selectedNum: string = '+65'
    isOpenNum: boolean = false;
    orderModel: orderModelInterface;
    applyForm: FormGroup;

    @ViewChild('formComponent') formComponent: ElementRef;

    constructor(
        private eventEmitterService: EventEmitterService,
        private infoService: InfoService,
        private router: Router,
        private orderService: OrderService) { }

    ngOnInit() {
        // not follow the path then navigate to models
        if (!this.orderService.orderModel) {
            this.router.navigate(['/models']);
        } else {
            // ^\w+：@ 之前必須以一個以上的文字&數字開頭，例如 abc
            // ((-\w+)：@ 之前可以出現 1 個以上的文字、數字或「-」的組合，例如 -abc-
            // (\.\w+))：@ 之前可以出現 1 個以上的文字、數字或「.」的組合，例如 .abc.
            // ((-\w+)|(\.\w+))*：以上兩個規則以 or 的關係出現，並且出現 0 次以上 (所以不能 –. 同時出現)
            // @：中間一定要出現一個 @
            // [A-Za-z0-9]+：@ 之後出現 1 個以上的大小寫英文及數字的組合
            // (\.|-)：@ 之後只能出現「.」或是「-」，但這兩個字元不能連續時出現
            // ((\.|-)[A-Za-z0-9]+)*：@ 之後出現 0 個以上的「.」或是「-」配上大小寫英文及數字的組合
            // \.[A-Za-z]+$/：@ 之後出現 1 個以上的「.」配上大小寫英文及數字的組合，結尾需為大小寫英文
            const emailRule = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/;
            const nricRule = /^[a-zA-Z]\d{7}[a-zA-Z]$/
            this.applyForm = new FormGroup({
                'firstName': new FormControl(null, [Validators.required, Validators.maxLength(50)]),
                'lastName': new FormControl(null, [Validators.required, Validators.maxLength(50)]),
                'NRIC': new FormControl(null, [Validators.required, Validators.maxLength(9), Validators.minLength(9), Validators.pattern(nricRule)]),
                'number': new FormControl(null, [Validators.required, Validators.maxLength(8), Validators.minLength(8), Validators.pattern("^[0-9]*$")]),
                'email': new FormControl(null, [Validators.required, Validators.email, Validators.maxLength(250), Validators.pattern(emailRule)]),
            })

            this.orderModel = this.orderService.orderModel;
        }

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

    onSubmit() {
        this.infoService.postPreSubmit({
            salutation: "",
            firstName: this.applyForm.get('firstName').value,
            lastName: this.applyForm.get('lastName').value,
            nric: this.applyForm.get('NRIC').value,
            mobileNo: this.applyForm.get('number').value,
            email: this.applyForm.get('email').value,
            comments: "",
            agreeSharePersonalData: true,
            receiveMarketingMaterial: false,
            contactOption: null,
            variantCode: this.orderModel.variantCode,
            terms: this.orderModel.tenure * 12,
            brand: this.orderModel.brandCode,
            isGuaranteedCoePrice: true,
            modelCode: this.orderModel.internalModelCode,
            financialProductCode: this.orderModel.financialProductCode,
            financialProductId: this.orderModel.financialProductId,
            downPaymentPercentage: 0,
            exteriorColorConfigItemCode: "VCI109",
            interiorColorConfigItemCode: "VCI119"
        }).then((resposne: any) => {
            this.orderService.orderModel.quoteRequestId = resposne.detail.quoteRequestId;
            this.router.navigate(['/application-submitted'])
        }).catch((error) => {
            console.error(error);
        });
    }
}
