import { Component, OnInit, ViewChildren, QueryList, ElementRef, Inject, HostListener } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Component({
    selector: 'app-all-models',
    templateUrl: './all-models.component.html',
    styleUrls: ['./all-models.component.css']
})
export class AllModelsComponent implements OnInit {

    @ViewChildren('jsAni') sections: QueryList<ElementRef>;

    constructor(@Inject(DOCUMENT) private document: Document) { }

    ngOnInit() { }

    @HostListener('window:load', [])
    onWindowLoaded() {
        console.log("load")
        this.onAddIsAnimated();
    }

    @HostListener('window:scroll', [])
    onWindowScroll() {
        this.onAddIsAnimated();
    }

    // 滑動到該區增加class "is-animated"
    onAddIsAnimated(): void {
        console.log(this.sections);
        this.sections && this.sections.map((element) => {
            const htmlEl = element.nativeElement as HTMLElement;
            const isInView = this.onCheckInViewport(htmlEl);
            const newElement = element;
            if (isInView && !htmlEl.classList.contains('is-animated')) {
                newElement.nativeElement.className += ' is-animated'
            }
            return newElement;
        })
    }

    // 確認元件是否在視窗內
    onCheckInViewport(el: HTMLElement): boolean {
        var rect = el.getBoundingClientRect();
        var isVisible = el.offsetHeight !== 0;
        console.log(isVisible);
        return isVisible && rect.bottom >= 0 && rect.right >= 0 && rect.top <= (window.innerHeight || this.document.documentElement.clientHeight) && rect.left <= (window.innerWidth || document.documentElement.clientWidth);
    }
}
