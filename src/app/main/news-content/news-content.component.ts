import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { EventEmitterService } from 'src/app/services/eventEmitter.service';

@Component({
    selector: 'app-news-content',
    templateUrl: './news-content.component.html',
    styleUrls: ["../../../styles/index.css"]
})
export class NewsContentComponent implements OnInit, AfterViewInit, OnDestroy {

    @ViewChild('newsContentComponent') newsContentComponent: ElementRef;

    constructor(private eventEmitterService: EventEmitterService) { }

    ngOnInit() { console.log("news content init") }

    ngAfterViewInit() { this.eventEmitterService.onLoadingComplete() }

    ngOnDestroy() { this.newsContentComponent.nativeElement.remove(); }
}
