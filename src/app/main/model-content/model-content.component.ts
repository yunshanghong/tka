import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EventEmitterService } from 'src/app/services/eventEmitter.service';
import { InfoService } from 'src/app/services/info.service';
import { OrderService } from 'src/app/services/order.service';

@Component({
    selector: 'app-model-content',
    templateUrl: './model-content.component.html',
    styleUrls: ['./model-content.component.css']
})
export class ModelContentComponent implements OnInit, AfterViewInit, OnDestroy {

    id: string;
    variantId: string;
    // 1. Car Information
    carName: string = "";
    carInterior: Array<Object>;
    carExterior: Array<Object>;


    // 4. Content Services
    serviceList: Array<Object> = [];

    @ViewChild('contentComponent') contentComponent: ElementRef;

    constructor(
        private infoService: InfoService,
        private eventEmitterService: EventEmitterService,
        private router: Router,
        private route: ActivatedRoute,
        private orderService: OrderService) { }

    ngOnInit() {
        this.id = this.route.snapshot.queryParams.id;
        this.variantId = this.route.snapshot.queryParams.variantId;

        console.log(this.id)
        console.log(this.variantId)

        // 1. Car Info 
        this.infoService.getCarInfo(this.id).subscribe(
            (response: any) => {
                console.log(response)
                this.carName = response.vehicle.name;
                this.carInterior = response.vehicle.variants;
            },
            (error) => { console.error(error) },
            () => { console.log(this.carExterior) }
        )

        // 2. Monthly Amount
        this.infoService.getMonthlyAmount(this.variantId).subscribe(
            (response: any) => { console.log(response) },
            (error) => { console.error(error) },
            () => { }
        )

        // 3. Deposit
        this.infoService.postCalcDeposit(Number(this.id), Number(this.variantId), 60).subscribe(
            (response: any) => { console.log(response) },
            (error) => { console.error(error) },
            () => { }
        )

        // 4. Content Services
        this.infoService.getContentServices().subscribe(
            (response: any) => this.serviceList = response,
            error => console.error(error),
            () => { console.log("got serviceList") }
        )
    }

    ngAfterViewInit() {
        console.log("content emitter launch")
        this.eventEmitterService.onLoadingComplete();
    }

    ngOnDestroy() {
        this.contentComponent.nativeElement.remove();
    }

    onBookNow() {
        this.orderService.orderModel.id = this.id;
        this.orderService.orderModel.variantId = this.variantId;
        this.router.navigate(["/term-condition"]);
    }
}
