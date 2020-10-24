import { EventEmitter, Injectable, } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class EventEmitterService {

    constructor() { console.log("eventEmitter init") }

    loadingEmitter: EventEmitter<boolean> = new EventEmitter()

    onLoadingComplete() {
        this.loadingEmitter.emit(true);
    }
}
