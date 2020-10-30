import { EventEmitter, Injectable, } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class EventEmitterService {

    constructor() { }

    loadingEmitter: EventEmitter<boolean> = new EventEmitter()

    onLoadingComplete() {
        this.loadingEmitter.emit(true);
    }
}
