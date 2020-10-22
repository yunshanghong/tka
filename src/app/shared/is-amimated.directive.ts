import { Directive, ElementRef, Inject, AfterViewChecked } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Directive({
    selector: "[appIsAni]"
})

export class IsAniDirective implements AfterViewChecked {

    constructor(private elementRef: ElementRef, @Inject(DOCUMENT) private document: Document) { }

    ngAfterViewChecked() {
        this.onAddIsAnimated();
    }

    // 滑動到該區增加class "is-animated"
    onAddIsAnimated(): void {
        const htmlEl = this.elementRef.nativeElement as HTMLElement;
        const isInView = this.onCheckInViewport(htmlEl);
        if (isInView && !htmlEl.classList.contains('is-animated') && htmlEl.classList.contains('ready')) {
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
