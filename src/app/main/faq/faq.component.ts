import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { EventEmitterService } from 'src/app/services/eventEmitter.service';

@Component({
    selector: 'app-faq',
    templateUrl: './faq.component.html',
    styleUrls: ["../../../styles/faq.css"]
})
export class FAQComponent implements OnInit, AfterViewInit, OnDestroy {

    @ViewChild('faqComponent') faqComponent: ElementRef;

    constructor(private eventEmitterService: EventEmitterService) { }

    ngOnInit() {  }

    ngAfterViewInit() { this.eventEmitterService.onLoadingComplete() }

    ngOnDestroy() { this.faqComponent.nativeElement.remove(); }
}
