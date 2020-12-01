import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InfoService } from 'src/app/services/info.service';
import { defaultFooterConfig } from '../layoutConfig';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
})
export class FooterComponent implements OnInit {

    Menus: Array<any> = defaultFooterConfig
    contactEmail: string = environment.contactEmail;
    fbUrl: string = environment.facebookUrl;
    igUrl: string = environment.igUrl;

    constructor(private router: Router, private infoService: InfoService) { }

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
