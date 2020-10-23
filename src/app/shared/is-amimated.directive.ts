import { Directive, ElementRef, Inject, OnInit, HostListener } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { EventEmitterService } from '../services/eventEmitter.service';

@Directive({
    selector: "[appIsAni]"
})

export class IsAniDirective implements OnInit {

    constructor(private elementRef: ElementRef, @Inject(DOCUMENT) private document: Document, public eventEmitterService: EventEmitterService) { }

    ngOnInit() {
        this.eventEmitterService.loadingEmitter.subscribe(() => { this.onAddIsAnimated() });
    }

    @HostListener('window:scroll', [])
    onWindowScroll() {
        this.eventEmitterService.loadingCompleted && this.onAddIsAnimated();
    }

    // 滑動到該區增加class "is-animated"
    onAddIsAnimated(): void {
        const htmlEl = this.elementRef.nativeElement as HTMLElement;
        const isInView = this.onCheckInViewport(htmlEl);
        if (isInView && !htmlEl.classList.contains('is-animated')) {
            this.elementRef.nativeElement.className += ' is-animated'
        }
    }

    // 確認元件是否在視窗內
    onCheckInViewport(el: HTMLElement): boolean {
        var rect = el.getBoundingClientRect();
        var isVisible = el.offsetHeight !== 0;
        return isVisible && rect.bottom >= 0 && rect.right >= 0 && rect.top <= (window.innerHeight || this.document.documentElement.clientHeight) && rect.left <= (window.innerWidth || document.documentElement.clientWidth);
    }
}
