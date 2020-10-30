import { DOCUMENT } from '@angular/common';
import { Component, HostListener, Inject, Renderer2 } from '@angular/core';

@Component({
    selector: 'app-goTop',
    templateUrl: './goTop.component.html',
})
export class GoTopComponent {

    goTopShow: boolean;

    constructor(@Inject(DOCUMENT) private document: Document, private renderer: Renderer2) { }

    @HostListener('window:load', [])
    onWindowLoad() {
        this.onGoTopHandler()
    }

    @HostListener('window:scroll', [])
    onWindowScroll() {
        this.onGoTopHandler()
    }

    onGoTopHandler() {
        var doc = this.document.documentElement;
        var windowScrollTop = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);

        if (windowScrollTop >= 200) {
            this.goTopShow = true;
        } else {
            this.goTopShow = false;
        }
    }

    onScrollTop() {
        window.scrollTo({ left: 0, top: 0, behavior: 'smooth' });
    }
}
