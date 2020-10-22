import { Directive, HostListener, HostBinding, OnInit, ElementRef, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Directive({
    selector: "[appIsAni]"
})

export class IsAniDirective implements OnInit {

    constructor(private elementRef: ElementRef, @Inject(DOCUMENT) private document: Document) { }

    ngOnInit() {
        // console.log("directive init")
        // console.log(this.elementRef);
    }

    @HostListener('window:load', [])
    onWindowLoaded() {
        // console.log("load")
        this.onAddIsAnimated();
    }

    @HostListener('window:scroll', [])
    onWindowScroll() {
        // console.log("scroll")
        this.onAddIsAnimated();
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
