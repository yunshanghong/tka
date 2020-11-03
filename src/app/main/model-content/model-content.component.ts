import { AfterViewInit, Component, ElementRef, EventEmitter, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EventEmitterService } from 'src/app/services/eventEmitter.service';
import { InfoService } from 'src/app/services/info.service';
import { OrderService } from 'src/app/services/order.service';

@Component({
    selector: 'app-model-content',
    templateUrl: './model-content.component.html',
    styleUrls: ["../../../styles/model.css"]
})
export class ModelContentComponent implements OnInit, AfterViewInit, OnDestroy {

    id: string;
    openAside: boolean = false;
    carInfoEmitter: EventEmitter<boolean> = new EventEmitter()

    // 1. Car Information
    carInfo: any;
    currentVariantId: number = 0;
    isOpenVariantSelector: boolean = false;
    currentColorId: number = 0;
    currentInteriorId: number = 0;
    tenures: Array<number>;
    currentTenureId: number = 1;
    leasingInfo: any;
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
            () => { this.carInfoEmitter.emit(true); }
        )

        // 4. Content Services
        this.infoService.getDynamicContentByType({ Type: 'Kinto.Services' }).subscribe(
            (response: any) => this.serviceList = response,
            error => console.error(error),
            () => { }
        )
    }

    ngAfterViewInit() {
        this.eventEmitterService.onLoadingComplete();
    }

    ngOnDestroy() {
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
                this.leasingInfo = leasing;
            },
            (error) => { console.error(error) },
            () => { this.onGetDeposit() }
        )
    }

    onGetDeposit() {
        const variantId = this.carInfo.vehicle.variants[this.currentVariantId].id;
        const tenure = this.tenures[this.currentTenureId] * 12;
        this.infoService.postCalcDeposit(this.leasingInfo.id, variantId, tenure).subscribe(
            (response: any) => this.amountInfo = response,
            (error) => { console.error(error) },
            () => { }
        )
    }

    onBookNow() {
        const selectedVariant = this.carInfo.vehicle.variants[this.currentVariantId]
        this.orderService.orderModel = {
            carName: this.carInfo.vehicle.name,
            id: this.id,
            variantId: selectedVariant.id,
            financialProductId: this.leasingInfo.id,
            colorName: selectedVariant.vehicleConfigItems[this.currentColorId].name,
            colorNumber: selectedVariant.vehicleConfigItems[this.currentColorId].iconColorCode,
            colorImage: selectedVariant.vehicleConfigItems[this.currentColorId].imageUrl,
            interiorName: selectedVariant.vehicleConfigItems[this.currentInteriorId].name,
            interiorNumber: selectedVariant.vehicleConfigItems[this.currentInteriorId].imageContent,
            interiorNumberUrl: selectedVariant.vehicleConfigItems[this.currentInteriorId].imageUrl,
            variantName: selectedVariant.name,
            tenure: this.tenures[this.currentTenureId],
            securityDeposit: this.amountInfo.securityDepositAmount,
            monthlyAmount: this.amountInfo.monthlyPaymentAmount,
            internalModelCode: selectedVariant.internalModelCode,
            variantCode: selectedVariant.code,
            financialProductCode: this.leasingInfo.financialProductCode,
            exteriorColorConfigItemCode: selectedVariant.vehicleConfigItems[this.currentColorId].vehicleConfigItemCode,
            interiorColorConfigItemCode: selectedVariant.vehicleConfigItems[this.currentInteriorId].vehicleConfigItemCode,
        };

        this.router.navigate(["/term-condition"]);
    }
}
