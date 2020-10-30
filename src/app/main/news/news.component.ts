import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { EventEmitterService } from 'src/app/services/eventEmitter.service';
import { InfoService } from 'src/app/services/info.service';
import Swiper from 'swiper';

@Component({
    selector: 'app-news',
    templateUrl: './news.component.html',
    styleUrls: ["../../../styles/news.css"]
})
export class NewsComponent implements AfterViewInit, OnDestroy {

    newsList: Array<Object>;

    @ViewChild('newsComponent') newsComponent: ElementRef;
    @ViewChild('newsSwiperPagination') newsSwiperPagination: ElementRef;
    @ViewChild('newsCarousel') newsCarousel: ElementRef;

    constructor(private infoService: InfoService, private eventEmitterService: EventEmitterService) { }

    ngAfterViewInit() {
        console.log("After View Init")
        this.infoService.getDynamicContentByType({ Type: "Kinto.PromotionalContent" }).subscribe(
            (response: any) => { this.newsList = response; console.log(response) },
            (error) => { console.error(error) },
            () => {
                this.onBuildFaq();
                this.eventEmitterService.onLoadingComplete()
            }
        )
    }

    ngOnDestroy() {
        console.log("news destroy")
        this.newsComponent.nativeElement.remove();
    }

    onBuildFaq() {
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

        var loop = this.newsList.length > 1;
        if (window.innerWidth >= 1024) {
            // 1024+
            loop = this.newsList.length > 3;
        }
        /* 隱藏操作鍵 */


        if (!loop) {
            swiperPageEl.classList.add('hide'); // swiperNextEl.classList.add('hide');
            // swiperPrevEl.classList.add('hide');
        } else {
            swiperPageEl.classList.remove('hide'); // swiperNextEl.classList.remove('hide');
            // swiperPrevEl.classList.remove('hide');
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
