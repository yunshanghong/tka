import { Component, HostListener, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { defaultNavigationConfig } from '../layoutConfig';
import { Router } from '@angular/router';

export interface MenuFirstLayer {
    title: string;
    children: Array<object>;
    url: string;
}

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
})
export class HeaderComponent {

    Menus: Array<any> = defaultNavigationConfig;
    MenusIsCollapse: boolean = false;
    HamburgerIsActive: boolean = false;

    constructor(@Inject(DOCUMENT) private document: Document, private router: Router) { }

    // 監控頁面滾動
    @HostListener('window:scroll', [])
    onWindowScroll() {
        this.MenusIsCollapse = this.document.documentElement.scrollTop >= 200 ? true : false;
    }

    onNavPage(i: number, j: number) {
        const target = this.Menus[i].children[j];
        if (target.queryParams) {
            this.router.navigate([target.url], { queryParams: target.queryParams });
        } else {
            this.router.navigate([target.url]);
        }
    }
}
