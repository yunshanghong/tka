import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: []
})
export class AppComponent {
	title = 'toyota-kinto-angular';

	@ViewChild('loader') loader: ElementRef;

	constructor() { }

	@HostListener('window:load', [])
	onWindowLoaded() {
		this.loader.nativeElement.className += ' loaded'
		setTimeout(() => {
			this.loader.nativeElement.remove();
		}, 2000);

	}
}
