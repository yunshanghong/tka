import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { EventEmitterService } from 'src/app/services/eventEmitter.service';
import { InfoService } from 'src/app/services/info.service';
import Swiper from 'swiper';

@Component({
    selector: 'app-news',
    templateUrl: './news.component.html',
    styleUrls: ["../../../styles/news.css"]
})
export class NewsComponent implements OnInit, OnDestroy {

    @ViewChild('newsComponent') newsComponent: ElementRef;
    @ViewChild('newsSwiperPagination') newsSwiperPagination: ElementRef;

    constructor(private infoService: InfoService, private eventEmitterService: EventEmitterService) { }

    ngOnInit() {
        this.infoService.getDynamicContentByType({ Type: "Kinto.PromotionalContent" }).subscribe(
            (response: any) => { console.log(response) },
            (error) => { console.error(error) },
            () => { this.eventEmitterService.onLoadingComplete() }
        )
        console.log("news init")
    }

    ngOnDestroy() {
        console.log("news destroy")
        this.newsComponent.nativeElement.remove();
    }

    buildFaq() {
        var mySwiper = null;
        var breakpoint = window.matchMedia('(min-width: 1024px)');

        var breakpointChecker = () => {
            mySwiper && mySwiper.destroy(true, true); // 如果不是 null 則 Destroy Swiper

            mySwiper = this.buildFaqCarousel(); // mySwiper 由 buildFaqCarousel return 出來，改成Angular應該會不相同
        };

        breakpointChecker(); // 一開始就執行

        breakpoint.addEventListener('change', breakpointChecker); // 監聽
    }

    buildFaqCarousel() {
        var swiperTarget = '#news-carousel';
        var swiperEl = document.querySelector(swiperTarget).parentElement;
        var swiperPageEl = this.newsSwiperPagination.nativeElement as HTMLElement;


        var swiperSlideEls = swiperEl.querySelectorAll('.swiper-slide');
        /* Loop 計算 */

        var loop = swiperSlideEls.length > 1;

        if (window.innerWidth >= 1024) {
            // 1024+
            loop = swiperSlideEls.length > 3;
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
            navigation: {// nextEl: swiperNextEl,
                // prevEl: swiperPrevEl
            },
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
