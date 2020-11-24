import { AfterViewChecked, Component, ElementRef, OnDestroy, OnInit, Renderer2, ViewChild, ViewEncapsulation } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { EventEmitterService } from 'src/app/services/eventEmitter.service';
import { InfoService } from 'src/app/services/info.service';
import Swiper from 'swiper';

@Component({
    selector: 'app-news',
    templateUrl: './news.component.html',
    styleUrls: ["../../../styles/news.css"],
    encapsulation: ViewEncapsulation.None
})
export class NewsComponent implements OnInit, OnDestroy, AfterViewChecked {

    topList: Array<Object>;
    downList: Array<Object>;
    renderList: boolean;
    showType: String;


    @ViewChild('newsComponent') newsComponent: ElementRef;
    @ViewChild('newsSwiperPagination') newsSwiperPagination: ElementRef;
    @ViewChild('newsCarousel') newsCarousel: ElementRef;

    constructor(
        private infoService: InfoService,
        private eventEmitterService: EventEmitterService,
        private renderer: Renderer2,
        private route: ActivatedRoute,
        private sanitizer: DomSanitizer) { }

    ngOnInit() {
        if (this.route.snapshot.queryParams.type) {
            this.showType = this.route.snapshot.queryParams.type
        };

        this.infoService.getDynamicContentByType({ Type: "Kinto.PromotionalContent" }).subscribe(
            (response: any) => {
                let result;
                if (this.showType) {
                    result = response
                        .filter(item => item.typeName === this.showType)
                        .map(item => ({ ...item, typeName: this.sanitizer.bypassSecurityTrustHtml(item.typeName.replace(' ', "<span class='large'>&nbsp;</span>")) }));
                } else {
                    result = response.map(item => ({ ...item, typeName: this.sanitizer.bypassSecurityTrustHtml(item.typeName.replace(' ', "<span class='large'>&nbsp;</span>")) }));
                }
                this.topList = result.splice(0, 3);
                this.downList = result;
            },
            (error) => { console.error(error) },
            () => {
                this.renderList = true;
            }
        )
    }

    ngAfterViewChecked() {
        if (this.renderList) {
            this.eventEmitterService.onLoadingComplete();
            this.onBuildFaq();
        }
    }

    ngOnDestroy() {
        this.newsComponent.nativeElement.remove();
    }

    onBuildFaq() {
        this.renderList = false;
        var mySwiper = null;
        var breakpoint = window.matchMedia('(min-width: 1024px)');

        var breakpointChecker = () => {
            mySwiper && mySwiper.destroy(true, true); // 如果不是 null 則 Destroy Swiper

            mySwiper = this.onBuildFaqCarousel(); // mySwiper 由 buildFaqCarousel return 出來，改成Angular應該會不相同
        };

        breakpointChecker(); // 一開始就執行

        breakpoint.addEventListener('change', breakpointChecker); // 監聽
    }

    onBuildFaqCarousel() {
        var swiperTarget = this.newsCarousel.nativeElement as HTMLElement;
        var swiperPageEl = this.newsSwiperPagination.nativeElement as HTMLElement;
        var loop = this.topList.length > 1;
        if (window.innerWidth >= 1024) {
            // 1024+
            loop = this.topList.length > 3;
        }
        /* 隱藏操作鍵 */


        if (!loop) {
            this.renderer['addClass'](this.newsSwiperPagination.nativeElement, 'hide');
        } else {
            this.renderer['removeClass'](this.newsSwiperPagination.nativeElement, 'hide');
        }
        /* 建立 */

        var mySwiper = new Swiper(swiperTarget, {
            observer: true,
            observeParents: true,
            spaceBetween: 20,
            grabCursor: true,
            slidesPerView: 'auto',
            centeredSlides: true,
            loop: loop,
            simulateTouch: loop,
            allowTouchMove: loop,
            preloadImages: false,
            lazy: {
                loadPrevNext: true
            },
            pagination: {
                el: swiperPageEl
            },
            navigation: {},
            breakpoints: {
                // when window width is >= 640px
                640: {
                    spaceBetween: 25,
                    slidesPerView: 'auto',
                    centeredSlides: true
                },
                // when window width is >= 1024px
                1024: {
                    spaceBetween: 20,
                    slidesPerView: 3,
                    slidesPerGroup: 3,
                    centeredSlides: false
                },
                // when window width is >= 1440px
                1440: {
                    spaceBetween: 88,
                    slidesPerView: 3,
                    slidesPerGroup: 3,
                    centeredSlides: false
                }
            }
        });
        return mySwiper;
    }
}
