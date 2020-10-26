import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { EventEmitterService } from 'src/app/services/eventEmitter.service';

@Component({
    selector: 'app-news',
    templateUrl: './news.component.html',
    styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit, AfterViewInit, OnDestroy {

    @ViewChild('newsComponent') newsComponent: ElementRef;

    constructor(private eventEmitterService: EventEmitterService) { }

    ngOnInit() { console.log("news init") }

    ngAfterViewInit() { this.eventEmitterService.onLoadingComplete() }

    ngOnDestroy() { this.newsComponent.nativeElement.remove(); }
}
