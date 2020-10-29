import { Component, ElementRef, OnInit, AfterViewInit, ViewChild, OnDestroy } from '@angular/core';
import { Location } from '@angular/common';

import { EventEmitterService } from 'src/app/services/eventEmitter.service';
import { NgForm } from '@angular/forms';
import { InfoService } from 'src/app/services/info.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-application-form',
    templateUrl: './application-form.component.html',
    styleUrls: ["../../../styles/term.css"]
})
export class ApplicationFormComponent implements OnInit, AfterViewInit, OnDestroy {

    @ViewChild('formComponent') formComponent: ElementRef;

    constructor(private eventEmitterService: EventEmitterService, private infoService: InfoService, private router: Router) { }

    ngOnInit() {

    }

    ngAfterViewInit() {
        this.eventEmitterService.onLoadingComplete();
    }

    ngOnDestroy() {
        this.formComponent.nativeElement.remove();
    }

    onStartAgain() {

    }

    onSubmit(form: NgForm) {
        console.log(form)
        console.log("submit")
        this.infoService.postSubmit({});
        this.router.navigate(['/application-submitted'])
    }
}
