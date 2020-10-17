import { Component, HostListener, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { defaultNavigationConfig } from '../layoutConfig';

export interface MenuFirstLayer {
    title: string;
    isOpen: boolean ;
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

    constructor(@Inject(DOCUMENT) private document: Document) { }
    
    // 監控頁面滾動
    @HostListener('window:scroll', [])
    onWindowScroll() {
        this.MenusIsCollapse = this.document.documentElement.scrollTop >= 200 ? true : false;
    }

    onToggleHamberguer(){
        this.HamburgerIsActive = !this.HamburgerIsActive;
    }

    onToggleMenu(inputIndex: number){
        this.Menus = this.Menus.map((item: MenuFirstLayer, index)=> (index === inputIndex) ? {...item, isOpen: !item.isOpen} : {...item} )
    }
}
