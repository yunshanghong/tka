import { Component } from '@angular/core';
import { defaultFooterConfig } from '../layoutConfig';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.css']
})
export class FooterComponent {

    Menus: Array<object> = defaultFooterConfig
}
