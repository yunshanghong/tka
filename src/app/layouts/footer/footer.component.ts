import { Component, OnInit } from '@angular/core';
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

    constructor() { }

    ngOnInit() {
    }

    onToggleMenu(inputIndex: number) {
        this.Menus = this.Menus.map((item: MenuFirstLayer, index) => (index === inputIndex) ? { ...item, isOpen: !item.isOpen } : { ...item })
    }
}
