import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { EventEmitterService } from 'src/app/services/eventEmitter.service';
import { InfoService } from 'src/app/services/info.service';
import { OrderService } from 'src/app/services/order.service';

@Component({
    selector: 'app-application-submitted',
    templateUrl: './application-submitted.component.html',
    styleUrls: ["../../../styles/term.css"]
})
export class ApplicationSubmittedComponent implements OnInit, OnDestroy {

    modelId: string;
    kycId: String = '';
    backHomeUrl: String = '';

    @ViewChild('submittedComponent') submittedComponent: ElementRef;

    constructor(
        private infoService: InfoService,
        private eventEmitterService: EventEmitterService,
        private router: Router,
        private orderService: OrderService) { }

    ngOnInit() {
        // not follow the path then navigate to models
        if (!this.orderService.orderModel) {
            this.router.navigate(["/models"]);
        }

        // preserve model content id
        this.modelId = this.orderService.orderModel.id;

        const postBody = {
            quoteRequestId: this.orderService.orderModel.quoteRequestId,
            rcoNumber: "KT0000377",
            salesmanCode: ""
        }

        this.infoService.postSubmit(postBody).subscribe(
            (response: any) => {
                this.kycId = response.kycId;
                this.backHomeUrl = response.redirectUrl;
            },
            (error) => console.error(error),
            () => {
                this.eventEmitterService.onLoadingComplete()
                this.orderService.orderModel = null;
            }
        )
    }

    ngOnDestroy() {
        this.submittedComponent.nativeElement.remove();
    }

    onStartAgain() {
        this.router.navigate(['/models-content', this.modelId])
    }
}
