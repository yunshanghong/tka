import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { EventEmitterService } from './services/eventEmitter.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: []
})
export class AppComponent {
	title = 'toyota-kinto-angular';

	@ViewChild('loader') loader: ElementRef;

	constructor(public eventEmitterService: EventEmitterService) { }

	@HostListener('window:load', [])
	onWindowLoaded() {
		this.loader.nativeElement.className += ' loaded';
		this.eventEmitterService.loadingEmitter.subscribe(() => { this.loader.nativeElement.remove(); })
	}
}
