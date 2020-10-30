import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { EventEmitterService } from 'src/app/services/eventEmitter.service';

@Component({
    selector: 'app-apply',
    templateUrl: './apply.component.html',
    styleUrls: ["../../../styles/apply.css"]
})
export class ApplyComponent implements AfterViewInit, OnDestroy {

    @ViewChild('applyComponent') applyComponent: ElementRef;

    constructor(private eventEmitterService: EventEmitterService) { }

    ngAfterViewInit() { this.eventEmitterService.onLoadingComplete() }

    ngOnDestroy() { this.applyComponent.nativeElement.remove(); }
}
