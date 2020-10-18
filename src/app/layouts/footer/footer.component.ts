import { Component, OnInit, QueryList, ViewChildren, ElementRef, Renderer2 } from '@angular/core';
import { defaultFooterConfig } from '../layoutConfig';

export interface MenuFirstLayer {
    title: string;
    isOpen: boolean;
    children: Array<object>;
    url: string;
}
@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

    Menus: Array<object> = defaultFooterConfig

    @ViewChildren("menu") menu: QueryList<ElementRef>;

    constructor(private renderer: Renderer2) { }

    ngOnInit() {
    }

    onToggleMenu(inputIndex: number) {
        this.menu.map((item, index) => {
            if(index === inputIndex){
                const clickedEl = item.nativeElement as HTMLElement;
                this.renderer[clickedEl.classList.contains('is-open') ? 'removeClass' : 'addClass'](item.nativeElement, 'is-open');
            }
        })
    }
}
