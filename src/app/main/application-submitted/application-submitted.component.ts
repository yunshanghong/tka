import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { EventEmitterService } from 'src/app/services/eventEmitter.service';
import { InfoService } from 'src/app/services/info.service';

@Component({
    selector: 'app-application-submitted',
    templateUrl: './application-submitted.component.html',
    styleUrls: ["../../../styles/term.css"]
})
export class ApplicationSubmittedComponent implements OnInit, OnDestroy {

    @ViewChild('submittedComponent') submittedComponent: ElementRef;

    constructor(private infoService: InfoService, private eventEmitterService: EventEmitterService) { }

    ngOnInit() {
        this.infoService.postAppNumber({}).subscribe(
            (response: any) => { console.log(response) },
            (error) => console.error(error),
            () => { this.eventEmitterService.onLoadingComplete() }
        )
    }

    ngOnDestroy() {
        this.submittedComponent.nativeElement.remove();
    }

}
