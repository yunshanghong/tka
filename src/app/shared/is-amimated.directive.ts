import { Directive, ElementRef, Inject, OnInit, HostListener, Renderer2, AfterViewInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { EventEmitterService } from '../services/eventEmitter.service';

@Directive({
    selector: "[appIsAni]"
})

export class IsAniDirective implements OnInit {

    loadingCompleted: boolean = false;

    constructor(private elementRef: ElementRef, @Inject(DOCUMENT) private document: Document, public eventEmitterService: EventEmitterService, private renderer: Renderer2) { }

    ngOnInit() {
        // page reload 
        this.eventEmitterService.loadingEmitter.subscribe(() => {
            this.loadingCompleted = true;
            this.onAddIsAnimated()
        });
    }

    @HostListener('window:scroll', [])
    onWindowScroll() {
        this.loadingCompleted && this.onAddIsAnimated();
    }

    // 滑動到該區增加class "is-animated"
    onAddIsAnimated(): void {
        const htmlEl = this.elementRef.nativeElement as HTMLElement;
        const isInView = this.onCheckInViewport(htmlEl);
        if (isInView && !htmlEl.classList.contains('is-animated')) {
            this.renderer['addClass'](this.elementRef.nativeElement, 'is-animated');
        }
    }

    // 確認元件是否在視窗內
    onCheckInViewport(el: HTMLElement): boolean {
        var rect = el.getBoundingClientRect();
        var isVisible = el.offsetHeight !== 0;
        return isVisible && rect.bottom >= 0 && rect.right >= 0 && rect.top <= (window.innerHeight || this.document.documentElement.clientHeight) && rect.left <= (window.innerWidth || this.document.documentElement.clientWidth);
    }
}
