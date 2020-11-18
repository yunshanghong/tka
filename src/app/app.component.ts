import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { EventEmitterService } from './services/eventEmitter.service';
import { OrderService } from './services/order.service';
import { RouterService } from './services/router.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: []
})
export class AppComponent implements OnInit {
	title = 'toyota-kinto-angular';

	constructor(public eventEmitterService: EventEmitterService, public orderService: OrderService, public routerService: RouterService) { }

	ngOnInit() {
	}

	onActivate(event: Component) {
		window.scroll(0, 0);
	}
}
