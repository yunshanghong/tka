import { Component, OnInit, AfterViewInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { EventEmitterService } from 'src/app/services/eventEmitter.service';
import { InfoService } from '../../services/info.service';

export interface brandCateInterface {
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
    brandList: Array<brandCateInterface> = [{ code: "0000", name: "All", order: 0 }]

    // 2. Category Menu
    cateOpen: boolean = false;
    cateList: Array<brandCateInterface> = [{ code: "0000", name: "All", order: 0 }]

    // 3. All Models 
    // NOTE 先把所有models抓到allList，等Brand/Category menu 去查
    allList: Array<Object>;
    showList: Array<Object>;

    // 4. Search String 
    // NOTE 直接去post查
    searchString: String = "";

    constructor(private infoService: InfoService, private eventEmitterService: EventEmitterService, private router: Router) { }

    ngOnInit() {
        console.log("models init")
        // 1. Brand Menu
        this.infoService.getMenu({ CategoryName: 'Vehicle.AvailableBrand' }).subscribe(
            (response: Array<brandCateInterface>) => response.map(item => this.brandList.push(item)),
            error => console.error(error),
            () => { console.log(this.brandList) }
        );

        // 2. Category Menu
        this.infoService.getMenu({ BrandCode: 'TOYOTA' }).subscribe(
            (response: Array<{ category: brandCateInterface, vehicles: Object }>) => response.map(item => this.cateList.push(item.category)),
            error => console.error(error),
            () => { console.log(this.cateList) }
        );

        // 3. All Models
        this.infoService.getAllModels().then(
            (response: Array<Object>) => {
                console.log(response);
                this.allList = this.showList = response;
            })
            .catch(error => console.error(error))
            .finally(() => { console.log(this.showList) })
    }

    ngAfterViewInit() {
        console.log("models emitter launch")
        this.eventEmitterService.onLoadingComplete();
    }

    ngOnDestroy() {
        this.modelsComponent.nativeElement.remove();
    }

    onModelsSearch(searchString: String) {
        this.infoService.postModelsSearch(searchString).then(
            (response: Array<Object>) => this.showList = response)
            .catch(error => console.error(error))
            .finally(() => { console.log(this.showList) })
    }
}
