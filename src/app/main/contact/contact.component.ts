import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { EventEmitterService } from 'src/app/services/eventEmitter.service';
import { InfoService } from 'src/app/services/info.service';
import { contactNumber } from '../../shared/contactNumber';

@Component({
    selector: 'app-contact',
    templateUrl: './contact.component.html',
    styleUrls: ["../../../styles/contact.css"]
})
export class ContactComponent implements OnInit, AfterViewInit, OnDestroy {

    numberList = contactNumber;
    isOpenNum: boolean = false;
    selectedNum: string = '+65'
    textarea: String = '';

    @ViewChild('contactComponent') contactComponent: ElementRef;

    constructor(private eventEmitterService: EventEmitterService, private infoService: InfoService, private router: Router) { }

    ngOnInit() { }

    ngAfterViewInit() {
        this.eventEmitterService.onLoadingComplete()
    }

    ngOnDestroy() {
        this.contactComponent.nativeElement.remove();
    }

    onSubmit(form: NgForm) {
        const formData = form.value;
        this.infoService.postContact({
            name: formData.name,
            contactNumber: this.selectedNum + '-' + formData.number,
            email: formData.email,
            content: formData.problem
        }).subscribe(
            (response) => { },
            (error) => { console.error(error) },
            () => { this.router.navigate(['/']); }
        )
    }
}
