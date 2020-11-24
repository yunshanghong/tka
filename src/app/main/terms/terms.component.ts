import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { EventEmitterService } from 'src/app/services/eventEmitter.service';

@Component({
    selector: 'app-terms',
    templateUrl: './terms.component.html',
    styleUrls: ["../../../styles/terms-to-use.css"]
})
export class TermsComponent implements AfterViewInit, OnDestroy {

    @ViewChild('termsComponent') termsComponent: ElementRef;

    constructor(private eventEmitterService: EventEmitterService) { }

    ngAfterViewInit() { this.eventEmitterService.onLoadingComplete() }

    ngOnDestroy() { this.termsComponent.nativeElement.remove(); }
}
