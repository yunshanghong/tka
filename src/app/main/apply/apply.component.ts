import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { EventEmitterService } from 'src/app/services/eventEmitter.service';

@Component({
    selector: 'app-apply',
    templateUrl: './apply.component.html',
    styleUrls: ["../../../styles/apply.css"]
})
export class ApplyComponent implements OnInit, AfterViewInit, OnDestroy {

    @ViewChild('applyComponent') applyComponent: ElementRef;

    constructor(private eventEmitterService: EventEmitterService) { }

    ngOnInit() { console.log("apply init") }

    ngAfterViewInit() { this.eventEmitterService.onLoadingComplete() }

    ngOnDestroy() { this.applyComponent.nativeElement.remove(); }
}
