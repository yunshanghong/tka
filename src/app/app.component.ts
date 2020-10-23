import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { EventEmitterService } from './services/eventEmitter.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: []
})
export class AppComponent implements OnInit {
	title = 'toyota-kinto-angular';

	@ViewChild('loader') loader: ElementRef;

	constructor(public eventEmitterService: EventEmitterService) { }

	ngOnInit() {
		this.eventEmitterService.loadingEmitter.subscribe(() => {
			this.loader.nativeElement.className += ' loaded';
			setTimeout(() => {
				this.loader.nativeElement.remove();
			}, 2000);
		})
	}
}
