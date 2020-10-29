import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common';


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
        }

        // Term & Conditions
        this.infoService.getTermCondition().subscribe(
            (response: termInterface) => this.termAndCondition = response.content,
            error => console.error(error),
            () => { console.log(this.termAndCondition); this.eventEmitterService.onLoadingComplete() }
        );
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
