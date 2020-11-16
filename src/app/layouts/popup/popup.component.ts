import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'app-popup',
    templateUrl: './popup.component.html'
})
export class PopupComponent {
    @Input() isPopup: boolean = false;

    @Output() change: EventEmitter<boolean> = new EventEmitter<boolean>();

    onClosePopup() {
        this.isPopup = false;
        this.change.emit(true);
    }
}
