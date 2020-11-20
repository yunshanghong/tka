import { Component, HostListener, Inject, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { defaultNavigationConfig } from '../layoutConfig';
import { Router } from '@angular/router';
import { InfoService } from 'src/app/services/info.service';

export interface MenuFirstLayer {
    title: string;
    children: Array<object>;
    url: string;
}

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {

    Menus: Array<any> = defaultNavigationConfig;
    MenusIsCollapse: boolean = false;
    HamburgerIsActive: boolean = false;

    constructor(@Inject(DOCUMENT) private document: Document, private router: Router, private infoService: InfoService) { }

    ngOnInit() {
        this.infoService.getAllFaqs().subscribe(
            (response: Array<Object>) => {
                const typeList = [];
                response.sort((a: any, b: any) => (a.typeName > b.typeName) ? 1 : ((b.typeName > a.typeName) ? -1 : 0)) // 依照order從大到小排列
                    .map((item: any) => {
                        if (typeList.indexOf(item.typeName) === -1) {
                            typeList.push(item.typeName)
                            this.Menus[2].children.push({ title: item.typeName, url: '/faq', queryParams: { type: item.typeName } })
                        }
                    })
            },
            (error) => console.error(error),
            () => { }
        )
    }

    // 監控頁面滾動
    @HostListener('window:scroll', [])
    onWindowScroll() {
        this.MenusIsCollapse = this.document.documentElement.scrollTop >= 200 ? true : false;
    }

    onNavPage(i: number, j: number) {
        const target = this.Menus[i].children[j];
        if (target.queryParams) {
            this.router.routeReuseStrategy.shouldReuseRoute = () => false;
            this.router.onSameUrlNavigation = 'reload';
            this.router.navigate([target.url], { queryParams: target.queryParams });
        } else {
            this.router.navigate([target.url]);
        }
    }
}
