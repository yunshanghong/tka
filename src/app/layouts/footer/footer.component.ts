import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { defaultFooterConfig } from '../layoutConfig';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
})
export class FooterComponent {

    Menus: Array<any> = defaultFooterConfig

    constructor(private router: Router) { }

    onNavPage(i: number, j: number) {
        const target = this.Menus[i].children[j];
        if (target.queryParams) {
            this.router.navigate([target.url], { queryParams: target.queryParams });
        } else {
            this.router.navigate([target.url]);
        }
    }
}
