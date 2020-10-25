import { Component, OnInit, HostListener, ElementRef, ViewChildren, ViewChild, QueryList, Renderer2, AfterViewChecked, OnDestroy } from '@angular/core';

// import Swiper JS
import Swiper from 'swiper';
import { InfoService } from '../../services/info.service';
import { EventEmitterService } from '../../services/eventEmitter.service';

export interface rgbInterface {
    r: number;
    g: number;
    b: number;
};

export interface bannerInterface {
    displayCarInfos: Array<Object>;
    minTerm: Object;
    defaultTerm: Object;
    maxTerm: Object;
}

export interface bulletDataInterface {
    color: string;
    text: string;
}

export interface choiceInterface {
    index: number;
    displayCarImg: string;
    id: number;
    tenure: number;
    defaultTerm: number;
    maxTerm: number;
    minTerm: number;
    variantId: number;
    name: string;
}

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewChecked, OnDestroy {
    loadedItems: number = 0;

    // 1. Banner
    banners: Array<Object>;
    renderBanner: boolean;
    bannerInfos: { minInfo: Object, defaultInfo: Object, maxInfo: Object };
    bannerShow: string = 'defaultInfo';

    // 2. Five Reasons
    fiveReasons: Array<Object>;
    renderReasons: boolean;

    // 3. Choice Carousel
    topChoices: Array<choiceInterface>;
    prevChoice: choiceInterface;
    currentChoice: choiceInterface;
    nextChoice: choiceInterface;
    choiceSwiper: Swiper;
    renderChoice: boolean;
    choiceYearShow: string = 'defaultTerm';

    // 4. FAQ Carousel
    FAQs: Array<Object>;
    renderFAQ: boolean;

    // 5. Latest Promotion
    promotions: Array<Object>;
    renderPromotion: boolean;

    @ViewChild('homeComponent') homeComponent: ElementRef;
    // 1. Banner
    @ViewChild('bannersection') bannersection: ElementRef;
    @ViewChild('bannaerGridContainer') bannaerGridContainer: ElementRef;
    @ViewChild('bannerSwiperContainer') bannerSwiperContainer: ElementRef;
    @ViewChild('bannerSwiperPagination') bannerSwiperPagination: ElementRef;
    @ViewChild('bannerSwiperPrev') bannerSwiperPrev: ElementRef;
    @ViewChild('bannerSwiperNext') bannerSwiperNext: ElementRef;
    // 2. Five Reasons
    @ViewChild('reasonsSwiperContainer') reasonsSwiperContainer: ElementRef;
    @ViewChild('reasonsSwiperPagination') reasonsSwiperPagination: ElementRef;
    @ViewChild('reasonsLine') reasonsLine: ElementRef;
    // 3. Choice Carousel
    @ViewChild('choiceSection') choiceSection: ElementRef;
    @ViewChild('choiceGridContainer') choiceGridContainer: ElementRef;
    @ViewChild('choiceTitleBox') choiceTitleBox: ElementRef;
    @ViewChild('choiceSwiperContainer') choiceSwiperContainer: ElementRef;
    @ViewChild('choiceSwiperPrev') choiceSwiperPrev: ElementRef;
    @ViewChild('choiceSwiperNext') choiceSwiperNext: ElementRef;
    // 4. FAQ Carousel
    @ViewChild('faqSwiperContainer') faqSwiperContainer: ElementRef;
    @ViewChild('faqSwiperPagination') faqSwiperPagination: ElementRef;
    @ViewChild('faqSwiperPrev') faqSwiperPrev: ElementRef;
    @ViewChild('faqSwiperNext') faqSwiperNext: ElementRef;
    @ViewChildren('faqSwiperSlide') faqSwiperSlides: QueryList<ElementRef>;
    @ViewChild('faqLine') faqLine: ElementRef;
    // 5. Latest Promotion
    @ViewChild('promotionSC') promotionSC: ElementRef;
    @ViewChild('promotionSwiperPagination') promotionSwiperPagination: ElementRef;
    @ViewChild('promotionSwiperPrev') promotionSwiperPrev: ElementRef;
    @ViewChild('promotionSwiperNext') promotionSwiperNext: ElementRef;

    constructor(private infoService: InfoService, private renderer: Renderer2, private eventEmitterService: EventEmitterService) { }

    ngOnInit() {
        console.log("home init");
        //#region load data before render
        // 1. Banner
        this.infoService.getBanner().then(
            (response: bannerInterface) => {
                this.banners = response.displayCarInfos;
                this.bannerInfos = { minInfo: response.minTerm, defaultInfo: response.defaultTerm, maxInfo: response.maxTerm }
            })
            .catch(error => console.error(error))
            .finally(() => {
                console.log("got banners")
                this.renderBanner = true;
                this.loadedItems += 1;
            });

        // 2. Five Reasons
        this.infoService.getFiveReasons().subscribe(
            (response: Array<Object>) => this.fiveReasons = response,
            error => console.error(error),
            () => {
                console.log("got Reasons")
                this.renderReasons = true;
                this.loadedItems += 1;
            });

        // 3. Top Choices
        this.infoService.getTopChoices().then(
            (response: Array<choiceInterface>) => {
                this.topChoices = response;
                this.prevChoice = this.topChoices[this.topChoices.length - 1];
                this.currentChoice = this.topChoices[0];
                this.nextChoice = this.topChoices[1];
            })
            .catch(error => console.error(error))
            .finally(() => {
                console.log("got Choices")
                this.renderChoice = true;
                this.loadedItems += 1;
            });

        // 4. FAQ
        this.infoService.getFAQ().subscribe(
            (response: Array<Object>) => this.FAQs = response,
            error => console.error(error),
            () => {
                console.log("got FAQ")
                this.renderFAQ = true;
                this.loadedItems += 1;
            });

        // 5. Latest Promotion
        this.infoService.getLatestPromotion().subscribe(
            (response: Array<Object>) => this.promotions = response,
            error => console.error(error),
            () => {
                console.log("got Promotion")
                this.renderPromotion = true;
                this.loadedItems += 1;
            });

        this.infoService.getHomeImageUrl().subscribe(
            (response: any) => { },
            error => console.error(error)
        );
        //#endregion
    }
    // execute after getting ViewChild
    ngAfterViewChecked() {
        // 1. Banner
        this.renderBanner && this.onBuildBannerCarousel();

        // 2. Five Reasons
        if (this.renderReasons && this.renderBanner) {
            this.onBuildCircleIconBox();
            this.onLineCalcReason();
        }

        // 3. Top Choices
        this.renderChoice && this.onBuildChoiceCarousel();

        // 4. FAQ
        if (this.renderFAQ) {
            this.onBuildFaq();
            this.onLineCalcFaq();
        }

        // 5. Latest Promotion
        this.renderPromotion && this.onBuildPromotionCarousel();

        // emitt loading complete
        if (this.loadedItems === 5) {
            console.log("Emit launch")
            this.eventEmitterService.onLoadingComplete();
            this.loadedItems = 0;
        }
    }

    @HostListener('window:resize', [])
    onWindowResize() {
        // 2. Five Reasons
        this.onLineCalcReason()
        // 4. FAQ Carousel
        this.onLineCalcFaq();
    }

    ngOnDestroy() {
        console.log("home destroy")
        this.homeComponent.nativeElement.remove();
    }

    //#region Section1. Banner Section
    onBuildBannerCarousel() {
        this.renderBanner = false;
        var swiperTarget = this.bannerSwiperContainer.nativeElement as HTMLElement;
        var swiperPageEl = this.bannerSwiperPagination.nativeElement as HTMLElement;// 點的資料（接API）
        var bulletData: Array<bulletDataInterface> = [];
        this.banners.map((item: { iconColorCode: string, name: string }) => bulletData.push({ color: item.iconColorCode || "#ffffff", text: item.name || "TOYOTA" }));

        new Swiper(swiperTarget, {
            observer: true,
            observeParents: true,
            spaceBetween: 60,
            effect: 'fade',
            loop: true,
            autoHeight: true,
            preloadImages: false,
            lazy: {
                loadPrevNext: true
            },
            pagination: {
                el: swiperPageEl,
                dynamicBullets: true,
                dynamicMainBullets: 1,
                clickable: true,
                renderBullet: (index, className) => {
                    var currentData = bulletData[index]; // 計算文字顏色

                    var rgb = this.onHexToRgb(currentData.color);
                    var textColor = rgb && this.onGetReverseColor(rgb);
                    return "\n\t\t\t\t\t\t<span class=\"".concat(className, " text-").concat(textColor, "\" style=\"color:").concat(currentData.color, "\"><span class=\"text\" aria-label=\"").concat(currentData.text, "\" data-text=\"").concat(currentData.text, "\"></span></span>\n\t\t\t\t\t");
                }
            },
            navigation: {
                nextEl: this.bannerSwiperNext.nativeElement as HTMLElement,
                prevEl: this.bannerSwiperPrev.nativeElement as HTMLElement
            }
        });
    }

    // -------------------
    // Tool
    // HEX 轉 RGB
    // https://stackoverflow.com/a/5624139/11240898

    onHexToRgb(hex: string): rgbInterface | null {
        // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
        var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
        hex = hex.replace(shorthandRegex, function (m, r, g, b) {
            return r + r + g + g + b + b;
        });
        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    }
    // 取得顏色接近 黑/白
    // https://stackoverflow.com/a/9780689/11240898


    onGetCloseWhiteOrBlack(rgb: rgbInterface) {
        var Y = 0.2126 * rgb.r + 0.7152 * rgb.g + 0.0722 * rgb.b;
        var c = Y < 128 ? 'dark' : 'white';
        return c;
    }
    // 取得反相顏色(黑/白)
    // https://stackoverflow.com/a/35970186/11240898


    onGetReverseColor(rgb: rgbInterface) {
        var c = this.onGetCloseWhiteOrBlack(rgb);
        return c === 'dark' ? 'white' : 'dark';
    }

    onToggleTerm(showItem: string): void {
        this.bannerShow = showItem;
    }
    //#endregion

    //#region Section2. Five Reasons Section
    onBuildCircleIconBox() {
        this.renderReasons = false
        var mySwiper = null;
        var breakpoint = window.matchMedia('(min-width: 640px)');

        var breakpointChecker = () => {
            if (breakpoint.matches) {
                // Large
                mySwiper && mySwiper.destroy(true, true); // 如果不是 null 則 Destroy Swiper
            } else {
                mySwiper = this.onBuildCircleIconBoxCarousel(); // mySwiper 由 buildCircleIconBoxCarousel return 出來，改成Angular應該會不相同
            }
        };

        breakpointChecker(); // 一開始就執行

        breakpoint.addEventListener('change', breakpointChecker); // 監聽
    }
    // 建立reasons實體
    onBuildCircleIconBoxCarousel() {
        var swiperTarget = this.reasonsSwiperContainer.nativeElement as HTMLElement;
        var swiperPageEl = this.reasonsSwiperPagination.nativeElement as HTMLElement;
        var mySwiper = null;

        if (swiperTarget !== null) {
            // 建立
            mySwiper = new Swiper(swiperTarget, {
                observer: true,
                observeParents: true,
                spaceBetween: 20,
                slidesPerView: 1,
                loop: true,
                pagination: {
                    el: swiperPageEl
                }
            });
        }
        return mySwiper;
    }

    onLineCalcReason() {
        var line = this.reasonsLine.nativeElement as HTMLElement;
        var preSec = this.bannersection.nativeElement as HTMLElement;
        var bannerPreSec = this.bannaerGridContainer.nativeElement;
        var preSecPlusHeight = bannerPreSec.offsetHeight + parseInt(preSec.style['paddingBottom'] || '0');
        this.renderer.setStyle(line, "top", "".concat((preSecPlusHeight * -1).toString(), "px"))
        this.renderer.setStyle(line, "height", "calc(100% + ".concat(preSecPlusHeight.toString(), "px)"))
    }
    //#endregion

    //#region Section3. Choice Carousel
    // 建立carousel實體
    onBuildChoiceCarousel(): void {
        this.renderChoice = false;
        var swiperTarget = this.choiceSwiperContainer.nativeElement as HTMLElement;
        this.choiceSwiper = new Swiper(swiperTarget, {
            observer: true,
            observeParents: true,
            grabCursor: true,
            centeredSlides: true,
            slidesPerView: 'auto',
            autoHeight: true,
            loop: true,
            loopedSlides: 3,
            preloadImages: false,
            lazy: {
                loadPrevNext: true
            },
            effect: 'coverflow',
            coverflowEffect: {
                scale: 0.4,
                rotate: 0,
                depth: 400,
                slideShadows: false
            },
            navigation: {
                nextEl: this.choiceSwiperNext.nativeElement as HTMLElement,
                prevEl: this.choiceSwiperPrev.nativeElement as HTMLElement
            },
            breakpoints: {
                // when window width is >= 1440px
                1440: {
                    coverflowEffect: {
                        scale: 0.7,
                        rotate: 0,
                        depth: 400,
                        slideShadows: false
                    }
                }
            }
        });

        this.choiceSwiper.on('slideNextTransitionStart', (swiper) => {
            this.onChoiceNext();
        });

        this.choiceSwiper.on('slidePrevTransitionStart', (swiper) => {
            this.onChoicePrev();
        });
    }

    // Carousel 下一項
    onChoiceNext(): void {
        this.prevChoice = this.currentChoice;
        this.currentChoice = this.nextChoice;

        const nextId = this.currentChoice.index === this.topChoices.length - 1 ? 0 : this.currentChoice.index + 1;
        this.nextChoice = this.topChoices[nextId];

    }
    // Carousel 前一項
    onChoicePrev(): void {
        this.nextChoice = this.currentChoice;
        this.currentChoice = this.prevChoice;

        const prevId = this.currentChoice.index === 0 ? this.topChoices.length - 1 : this.currentChoice.index - 1;
        this.prevChoice = this.topChoices[prevId];
    }
    onToggleChoiceTerm(showTerm: string): void {
        this.choiceYearShow = showTerm;
    }
    //#endregion

    //#region Section4. FAQ
    onBuildFaq() {
        this.renderFAQ = false;
        var mySwiper = null;
        var breakpoint = window.matchMedia('(min-width: 1024px)');

        var breakpointChecker = () => {
            mySwiper && mySwiper.destroy(true, true); // 如果不是 null 則 Destroy Swiper

            mySwiper = this.onBuildFaqCarousel(); // mySwiper 由 buildFaqCarousel return 出來，改成Angular應該會不相同
        };

        breakpointChecker(); // 一開始就執行

        breakpoint.addEventListener('change', breakpointChecker); // 監聽
    }

    onBuildFaqCarousel(): Swiper {
        var swiperTarget = this.faqSwiperContainer.nativeElement as HTMLElement;
        var swiperPageEl = this.faqSwiperPagination.nativeElement as HTMLElement;
        var swiperNextEl = this.faqSwiperNext.nativeElement as HTMLElement;
        var swiperPrevEl = this.faqSwiperPrev.nativeElement as HTMLElement;
        var swiperSlideEls = this.faqSwiperSlides; // Loop 計算

        var loop = swiperSlideEls.length > 1;

        if (window.innerWidth >= 1024) {
            // 1024+
            loop = swiperSlideEls.length > 3;
        } // 隱藏操作鍵

        if (!loop) {
            swiperPageEl.classList.add('hide');
            swiperNextEl.classList.add('hide');
            swiperPrevEl.classList.add('hide');
        } else {
            swiperPageEl.classList.remove('hide');
            swiperNextEl.classList.remove('hide');
            swiperPrevEl.classList.remove('hide');
        }

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
            navigation: {
                nextEl: swiperNextEl,
                prevEl: swiperPrevEl
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

    onLineCalcFaq() {
        var line = this.faqLine.nativeElement as HTMLElement;
        var preSec = this.choiceSection.nativeElement as HTMLElement;
        var gridPreSec = this.choiceGridContainer.nativeElement;
        var titleBoxPreSec = this.choiceTitleBox.nativeElement;
        var preSecPlusHeight = gridPreSec.offsetHeight - titleBoxPreSec.offsetHeight + parseInt(preSec.style['paddingBottom'] || '0');
        this.renderer.setStyle(line, "top", "".concat((preSecPlusHeight * -1).toString(), "px"))
        this.renderer.setStyle(line, "height", "calc(100% + ".concat(preSecPlusHeight.toString(), "px)"))
    }
    //#endregion

    //#region Section5. Latest Promotion
    onBuildPromotionCarousel(): void {
        this.renderPromotion = false;
        var swiperTarget = this.promotionSC.nativeElement as HTMLElement;
        var swiperPageEl = this.promotionSwiperPagination.nativeElement as HTMLElement;
        var swiperNextEl = this.promotionSwiperNext.nativeElement as HTMLElement;
        var swiperPrevEl = this.promotionSwiperPrev.nativeElement as HTMLElement;
        new Swiper(swiperTarget, {
            observer: true,
            observeParents: true,
            // spaceBetween: 20,
            effect: 'coverflow',
            grabCursor: true,
            centeredSlides: true,
            slidesPerView: 'auto',
            slideToClickedSlide: true,
            loop: true,
            preloadImages: false,
            autoHeight: true,
            loopedSlides: 3,
            lazy: {
                loadPrevNext: true
            },
            coverflowEffect: {
                rotate: 59,
                depth: 250,
                slideShadows: false
            },
            pagination: {
                el: swiperPageEl
            },
            navigation: {
                nextEl: swiperNextEl,
                prevEl: swiperPrevEl
            },
            breakpoints: {
                // when window width is >= 640px
                640: {
                    coverflowEffect: {
                        rotate: 58,
                        depth: 200,
                        slideShadows: false
                    }
                },
                // when window width is >= 1024px
                1024: {
                    coverflowEffect: {
                        rotate: 78,
                        depth: 520,
                        slideShadows: false
                    }
                }
            }
        });
    }
    //#endregion

}
