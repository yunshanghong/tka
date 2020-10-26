import { Component, HostListener, Inject, ViewChildren, ElementRef, QueryList, Renderer2, ViewChild } from '@angular/core';
import { EventEmitterService } from 'src/app/services/eventEmitter.service';

@Component({
    selector: 'app-loader',
    templateUrl: './loader.component.html',
    styleUrls: ['./loader.component.css']
})
export class LoaderComponent {

    @ViewChild('loader') loader: ElementRef;

    constructor(public eventEmitterService: EventEmitterService) { }

    ngOnInit() {
        console.log("loader init")
        this.eventEmitterService.loadingEmitter.subscribe(() => {
            console.log("appLoader receive event")
            this.loader.nativeElement.className += ' loaded';
            setTimeout(() => {
                this.loader.nativeElement.remove();
            }, 2000);
        })
    }

    ngAfterViewInit() {

    }
}