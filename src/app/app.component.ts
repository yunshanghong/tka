import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { EventEmitterService } from './services/eventEmitter.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: []
})
export class AppComponent implements OnInit {
	title = 'toyota-kinto-angular';

	constructor(public eventEmitterService: EventEmitterService) { }

	ngOnInit() {
		console.log("app init");
	}
}
