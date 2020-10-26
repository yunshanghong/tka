import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { EventEmitterService } from 'src/app/services/eventEmitter.service';

@Component({
    selector: 'app-contact',
    templateUrl: './contact.component.html',
    styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit, AfterViewInit, OnDestroy {

    @ViewChild('contactComponent') contactComponent: ElementRef;

    constructor(private eventEmitterService: EventEmitterService) { }

    ngOnInit() { console.log("contact init") }

    ngAfterViewInit() { this.eventEmitterService.onLoadingComplete() }

    ngOnDestroy() { this.contactComponent.nativeElement.remove(); }
}
