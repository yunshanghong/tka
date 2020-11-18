import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';

import { EventEmitterService } from 'src/app/services/eventEmitter.service';
import { InfoService } from '../../services/info.service';
import { Router } from '@angular/router';
import { OrderService } from 'src/app/services/order.service';

export interface termInterface {
    content: string;
}

@Component({
    selector: 'app-term-condition',
    templateUrl: './term-condition.component.html',
    styleUrls: ["../../../styles/term.css"]
})
export class TermConditionComponent implements OnInit, OnDestroy {

    termAndCondition: string;
    isPopup: boolean = false;

    @ViewChild('termComponent') termComponent: ElementRef;

    constructor(
        private infoService: InfoService,
        private eventEmitterService: EventEmitterService,
        private router: Router,
        private orderService: OrderService) { }

    ngOnInit() {
        // not follow the path then navigate to models
        if (!this.orderService.orderModel) {
            this.router.navigate(["/models"]);
        } else {
            const brandCode = this.orderService.orderModel.brandCode;
            // Term & Conditions
            this.infoService.getTermCondition(brandCode).subscribe(
                (response: termInterface) => this.termAndCondition = response.content,
                error => {
                    this.isPopup = true;
                    console.error(error);
                },
                () => { this.eventEmitterService.onLoadingComplete() }
            );
        }
    }

    ngOnDestroy() {
        this.termComponent.nativeElement.remove();
    }

    onNextPage() {
        this.router.navigate(["/application-form"]);
    }

    onPrevPage() {
        this.router.navigate(['/models-content', this.orderService.orderModel.id])
    }
}
