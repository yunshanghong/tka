import { AfterViewChecked, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EventEmitterService } from 'src/app/services/eventEmitter.service';
import { InfoService } from 'src/app/services/info.service';

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
        private router: Router) { }

    ngOnInit() {
        console.log("news content init")

        this.id = this.route.snapshot.params["id"];

        this.infoService.getNewsContent(this.id).subscribe(
            (response: Object) => {
                console.log(response);
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
}
