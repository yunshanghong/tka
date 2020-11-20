import { Component, OnInit, AfterViewInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { EventEmitterService } from 'src/app/services/eventEmitter.service';
import { InfoService } from '../../services/info.service';

export interface brandCateInterface {
    brandCode: String;
    code: string;
    name: string;
    order: number;
}
@Component({
    selector: 'app-all-models',
    templateUrl: './all-models.component.html',
    styleUrls: ["../../../styles/model.css"]
})
export class AllModelsComponent implements OnInit, AfterViewInit, OnDestroy {

    @ViewChild('modelsComponent') modelsComponent: ElementRef;

    // 1. Brand Menu
    brandOpen: boolean = false;
    brandList: Array<brandCateInterface> = [{ brandCode: "All", code: "All", name: "All", order: 0 }]
    selectBrand: String = "All";

    // 2. Category Menu
    cateOpen: boolean = false;
    cateList: Array<brandCateInterface> = [{ brandCode: "All", code: "All", name: "All", order: 9999 }]
    selectCate: String = "All";

    // 3. All Models 
    showList: Array<Object>;

    // 4. Search String 
    searchString: String = "";

    constructor(private infoService: InfoService, private eventEmitterService: EventEmitterService, private router: Router) { }

    ngOnInit() {
        // 1. Brand Menu
        this.infoService.getBrandMenu().subscribe(
            (response: Array<brandCateInterface>) => response.map(item => this.brandList.push(item)),
            error => console.error(error),
            () => {
                this.brandList.sort((a: any, b: any) => (a.order < b.order) ? 1 : ((b.order < a.order) ? -1 : 0)) // 依照order從大到小排列
            }
        );

        // 2. Category Menu
        this.infoService.getCateMenu({ BrandCode: '' }).subscribe(
            (response: Array<{ category: brandCateInterface, vehicles: Object }>) => response.map(item => this.cateList.push(item.category)),
            error => console.error(error),
            () => {
                this.cateList.sort((a: any, b: any) => (a.order < b.order) ? 1 : ((b.order < a.order) ? -1 : 0)) // 依照order從大到小排列
            }
        );

        // 3. All Models
        this.infoService.getAllModels()
            .then((response: Array<Object>) => {
                this.showList = response.sort((a: any, b: any) => (a.itemOrder < b.itemOrder) ? 1 : ((b.itemOrder < a.itemOrder) ? -1 : 0)) // 依照itemOrder從大到小排列
            })
            .catch(error => console.error(error))
            .finally(() => { })
    }

    ngAfterViewInit() {
        this.eventEmitterService.onLoadingComplete();
    }

    ngOnDestroy() {
        this.modelsComponent.nativeElement.remove();
    }

    onModelsSearch(searchString: String) {
        this.infoService.postModelsSearch(searchString).then(
            (response: Array<Object>) => this.showList = response.sort((a: any, b: any) => (a.itemOrder < b.itemOrder) ? 1 : ((b.itemOrder < a.itemOrder) ? -1 : 0))) // 依照itemOrder從大到小排列
            .catch(error => console.error(error))
            .finally(() => { })
    }

    onSelectBrand(selectBrand: String) {
        this.selectBrand = selectBrand;
        this.brandOpen = !this.brandOpen;

        const brandWithCate = this.cateList.find(item => item.name === this.selectCate && item.brandCode === selectBrand);

        if (!brandWithCate) {
            this.selectCate = "All"
        }
    }
}
