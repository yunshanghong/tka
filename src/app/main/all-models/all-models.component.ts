import { isNgTemplate } from '@angular/compiler';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { EventEmitterService } from 'src/app/services/eventEmitter.service';
import { InfoService } from '../../services/info.service';

export interface brandCateInterface {
    code: string;
    name: string;
    order: number;
}
export interface allModelInterface {
    category: brandCateInterface
    vehicles: Array<Object>
}

@Component({
    selector: 'app-all-models',
    templateUrl: './all-models.component.html',
    styleUrls: ['./all-models.component.css']
})
export class AllModelsComponent implements OnInit, AfterViewInit {

    // 1. Brand Menu
    brandOpen: boolean = false;
    brandList: Array<brandCateInterface> = [{ code: "0000", name: "All", order: 0 }]

    // 2. Category Menu
    cateOpen: boolean = false;
    cateList: Array<brandCateInterface> = [{ code: "0000", name: "All", order: 0 }]

    // 3. All Models
    allList: Array<Object>;
    showList: Array<Object>;

    constructor(private infoService: InfoService, private eventEmitterService: EventEmitterService) { }

    ngOnInit() {
        console.log("models init")
        // 1. Brand Menu
        this.infoService.getBrandMenu().subscribe(
            (response: Array<brandCateInterface>) => response.map(item => this.brandList.push(item)),
            error => console.error(error),
            () => { console.log(this.brandList) }
        );

        // 2. Category Menu
        this.infoService.getCateMenu().subscribe(
            (response: Array<{ category: brandCateInterface, vehicles: Object }>) => response.map(item => this.cateList.push(item.category)),
            error => console.error(error),
            () => { console.log(this.cateList) }
        );

        // 3. All Models
        this.infoService.getAllModels().subscribe(
            (response: Array<allModelInterface>) => response.map(item => {
                if (item.category.order === 0) {
                    this.allList = this.showList = item.vehicles;
                }
            }),
            error => console.error(error),
            () => { console.log(this.showList) }
        )
    }

    ngAfterViewInit() {
        this.eventEmitterService.onLoadingComplete();
    }

}
