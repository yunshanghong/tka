import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { EventEmitterService } from 'src/app/services/eventEmitter.service';
import { InfoService } from 'src/app/services/info.service';

@Component({
    selector: 'app-about',
    templateUrl: './about.component.html',
    styleUrls: ["../../../styles/about.css"]
})
export class AboutComponent implements OnInit, AfterViewInit, OnDestroy {

    // 1. Reasons
    reasons: Array<Object>;

    // 2. Services
    services: Array<Object>;

    @ViewChild('aboutComponent') aboutComponent: ElementRef;

    constructor(private infoService: InfoService, private eventEmitterService: EventEmitterService) { }

    ngOnInit() {
        console.log("about init");
        // 1. Reasons
        this.infoService.getDynamicContentByType({ Type: "Kinto.Reasons" }).subscribe(
            (response: any) => this.reasons = response,
            (error) => { console.error(error) },
            () => { console.log(this.reasons) }
        )

        // 2. Services
        this.infoService.getDynamicContentByType({ Type: "Kinto.Services" }).subscribe(
            (response: Array<Object>) => this.services = response,
            (error) => { console.error(error) },
            () => { console.log(this.services) }
        )
    }

    ngAfterViewInit() { this.eventEmitterService.onLoadingComplete() }

    ngOnDestroy() { this.aboutComponent.nativeElement.remove(); }
}
