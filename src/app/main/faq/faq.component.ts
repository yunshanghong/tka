import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventEmitterService } from 'src/app/services/eventEmitter.service';
import { InfoService } from 'src/app/services/info.service';

@Component({
    selector: 'app-faq',
    templateUrl: './faq.component.html',
    styleUrls: ["../../../styles/faq.css"]
})
export class FAQComponent implements OnInit, OnDestroy {

    allList: Array<Object>;
    typeList: Array<String> = [];
    showType: String = "All";
    searchString: String = "";
    isSelectOpen: boolean = false;

    @ViewChild('faqComponent') faqComponent: ElementRef;

    constructor(private infoService: InfoService, private eventEmitterService: EventEmitterService, private route: ActivatedRoute) { }

    ngOnInit() {

        if (this.route.snapshot.queryParams.type) {
            this.showType = this.route.snapshot.queryParams.type
        };

        this.infoService.getAllFaqs().subscribe(
            (response: Array<Object>) => {
                this.allList = response.sort((a: any, b: any) => (a.order < b.order) ? 1 : ((b.order < a.order) ? -1 : 0)) // 依照order從大到小排列
                    .map((item: any) => {
                        if (this.typeList.indexOf(item.typeName) === -1) { this.typeList.push(item.typeName) }
                        return { ...item, open: false };
                    })
            },
            (error) => console.error(error),
            () => {
                console.log(this.typeList);
                this.typeList.sort((a: any, b: any) => (a > b) ? 1 : ((b > a) ? -1 : 0)) // 依照typeName從大到小排列
                this.eventEmitterService.onLoadingComplete()
            }
        )
    }

    ngOnDestroy() {
        this.faqComponent.nativeElement.remove();
    }

    onFaqSearch(searchString: String) {
        this.infoService.postFaqSearch(searchString).subscribe(
            (response: Array<Object>) => {
                const newTypeList = [];
                this.allList = response.map((item: any) => {
                    if (newTypeList.indexOf(item.typeName) === -1) { newTypeList.push(item.typeName) }
                    return { ...item, open: false };
                })
                this.typeList = newTypeList;
            },
            (error) => console.error(error)
        )
    }
}
