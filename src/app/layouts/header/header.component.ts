import { Component, HostListener, Inject, ViewChildren, ElementRef, QueryList, Renderer2 } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { defaultNavigationConfig } from '../layoutConfig';

export interface MenuFirstLayer {
    title: string;
    children: Array<object>;
    url: string;
}

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent {

    Menus: Array<object> = defaultNavigationConfig;
    MenusIsCollapse: boolean = false;
    HamburgerIsActive: boolean = false;

    @ViewChildren('menu') menu: QueryList<ElementRef>;

    constructor(@Inject(DOCUMENT) private document: Document, private renderer: Renderer2) { }

    // 監控頁面滾動
    @HostListener('window:scroll', [])
    onWindowScroll() {
        this.MenusIsCollapse = this.document.documentElement.scrollTop >= 200 ? true : false;
    }

    onToggleHamberguer() {
        this.HamburgerIsActive = !this.HamburgerIsActive;
    }

    onToggleMenu(inputIndex: number) {
        this.menu.map((item, index) => {
            if (index === inputIndex) {
                const clickedEl = item.nativeElement as HTMLElement;
                this.renderer[clickedEl.classList.contains('is-open') ? 'removeClass' : 'addClass'](item.nativeElement, 'is-open');
            }
        })
    }
}
