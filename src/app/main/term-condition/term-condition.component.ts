import { Component, OnInit } from '@angular/core';
import { InfoService } from '../../services/info.service';

export interface termInterface {
    content: string;
}

@Component({
    selector: 'app-term-condition',
    templateUrl: './term-condition.component.html',
    styleUrls: ['./term-condition.component.css']
})
export class TermConditionComponent implements OnInit {

    termAndCondition: string;

    constructor(private infoService: InfoService) { }

    ngOnInit() {
        // Term & Conditions
        this.infoService.getTermCondition().subscribe(
            (response: termInterface) => this.termAndCondition = response.content,
            error => console.error(error)
        );
    }

}
