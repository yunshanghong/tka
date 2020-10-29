import { AfterViewInit, Component, ElementRef, EventEmitter, OnDestroy, OnInit, ViewChild } from '@angular/core';
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
    carInfoEmitter: EventEmitter<boolean> = new EventEmitter()

    // 1. Car Information
    carInfo: any;
    currentVariantId: number = 0;
    isOpenVariantSelector: boolean = false;
    currentColorId: number = 0;
    currentInteriorId: number = 0;
    tenures: Array<number>;
    currentTenureId: number = 1;
    financialProductId: number;
    amountInfo: any;

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
        this.id = this.route.snapshot.params["id"];

        this.carInfoEmitter.subscribe(() => {
            const variantId = this.carInfo.vehicle.variants[this.currentVariantId].id;
            this.onGetTenure(variantId);
        })

        // 1. Car Info 
        this.infoService.getCarInfo(this.id).subscribe(
            (response: any) => {
                console.log(response);
                this.carInfo = response;
                const configItems = response.vehicle.variants[this.currentVariantId].vehicleConfigItems;
                this.currentColorId = configItems.findIndex(item => item.itemType === 'Color');
                this.currentInteriorId = configItems.findIndex(item => item.itemType === 'Interior');
            },
            (error) => {
                // jump out of this page
                console.error(error);
                this.router.navigate(['/models']);
            },
            () => {
                console.log(this.currentColorId)
                console.log(this.currentInteriorId);

                this.carInfoEmitter.emit(true);
            }
        )

        // 4. Content Services
        this.infoService.getDynamicContentByType({ Type: 'Kinto.Services' }).subscribe(
            (response: any) => this.serviceList = response,
            error => console.error(error),
            () => {
                console.log("got serviceList")
            }
        )
    }

    ngAfterViewInit() {
        console.log("content emitter launch")
        this.eventEmitterService.onLoadingComplete();
    }

    ngOnDestroy() {
        console.log('model content destroy');
        this.contentComponent.nativeElement.remove();
    }

    onChangeVariant(index: number) {
        this.currentVariantId = index;

        const configItems = this.carInfo.vehicle.variants[this.currentVariantId].vehicleConfigItems;
        this.currentColorId = configItems.findIndex(item => item.itemType === 'Color');
        this.currentInteriorId = configItems.findIndex(item => item.itemType === 'Interior');

        const variantId = this.carInfo.vehicle.variants[this.currentVariantId].id;
        this.onGetTenure(variantId);
    }

    onChangeTenure(index: number) {
        this.currentTenureId = index;
        this.onGetDeposit();
    }

    onGetTenure(variantId) {
        this.infoService.getMonthlyAmount(variantId).subscribe(
            (response: any) => {
                const leasing = response.leasing;
                this.tenures = [leasing.minTerm / 12, leasing.defaultTerm / 12, leasing.maxTerm / 12];
                this.financialProductId = leasing.id;
            },
            (error) => { console.error(error) },
            () => { this.onGetDeposit() }
        )
    }

    onGetDeposit() {
        const variantId = this.carInfo.vehicle.variants[this.currentVariantId].id;
        console.log(variantId);
        const tenure = this.tenures[this.currentTenureId] * 12;
        console.log(tenure);
        this.infoService.postCalcDeposit(this.financialProductId, variantId, tenure).subscribe(
            (response: any) => this.amountInfo = response,
            (error) => { console.error(error) },
            () => { console.log(this.amountInfo) }
        )
    }

    onBookNow() {
        this.orderService.orderModel.id = this.id;
        this.orderService.orderModel.variantId = "0";
        this.router.navigate(["/term-condition"]);
    }
}
