import { AfterViewChecked, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EventEmitterService } from 'src/app/services/eventEmitter.service';
import { InfoService } from 'src/app/services/info.service';
import { RouterService } from 'src/app/services/router.service';

@Component({
    selector: 'app-news-content',
    templateUrl: './news-content.component.html',
    styleUrls: ["../../../styles/news.css"]
})
export class NewsContentComponent implements OnInit, AfterViewChecked, OnDestroy {

    id: number;
    contentInfo: Object;
    renderContent: boolean;

    @ViewChild('newsContentComponent') newsContentComponent: ElementRef;

    constructor(
        private eventEmitterService: EventEmitterService,
        private infoService: InfoService,
        private route: ActivatedRoute,
        private router: Router,
        private routerService: RouterService) { }

    ngOnInit() {
        this.id = this.route.snapshot.params["id"];

        this.infoService.getNewsContent(this.id).subscribe(
            (response: Object) => {
                this.contentInfo = response;
            },
            error => {
                console.error(error);
                this.router.navigate(['/news']);
            },
            () => { this.renderContent = true }
        );
    }

    ngAfterViewChecked() {
        if (this.renderContent) {
            this.renderContent = false;
            this.eventEmitterService.onLoadingComplete();
        }
    }

    ngOnDestroy() {
        this.newsContentComponent.nativeElement.remove();
    }

    onNavPrevPage() {
        const target = this.routerService.getPreviousUrl().split("?");
        if (target.length === 2 && target[0] === "/news" && target[1].split("=").length === 2 && target[1].split("=")[0] === 'type') {
            this.router.navigate(['/news'], { queryParams: { "type": target[1].split("=")[1].replace("%20", " ").replace("%25", "%") } });
        } else {
            this.router.navigate(['/news']);
        }
    }
}
