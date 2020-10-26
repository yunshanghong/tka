import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { EventEmitterService } from 'src/app/services/eventEmitter.service';

@Component({
    selector: 'app-faq',
    templateUrl: './faq.component.html',
    styleUrls: ['./faq.component.css']
})
export class FAQComponent implements OnInit, AfterViewInit, OnDestroy {

    @ViewChild('faqComponent') faqComponent: ElementRef;

    constructor(private eventEmitterService: EventEmitterService) { }

    ngOnInit() { console.log("faq init") }

    ngAfterViewInit() { this.eventEmitterService.onLoadingComplete() }

    ngOnDestroy() { this.faqComponent.nativeElement.remove(); }
}
