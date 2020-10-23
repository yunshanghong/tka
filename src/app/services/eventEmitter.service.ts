import { EventEmitter, Injectable, } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class EventEmitterService {

    loadingCompleted: boolean = false;

    loadingEmitter: EventEmitter<boolean> = new EventEmitter()

    onLoadingComplete() {
        this.loadingEmitter.emit(true);
        this.loadingCompleted = true;
    }
}
