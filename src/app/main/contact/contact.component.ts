import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
    contactForm: FormGroup;

    @ViewChild('contactComponent') contactComponent: ElementRef;

    constructor(private eventEmitterService: EventEmitterService, private infoService: InfoService, private router: Router) { }

    ngOnInit() {
        // ^\w+：@ 之前必須以一個以上的文字&數字開頭，例如 abc
        // ((-\w+)：@ 之前可以出現 1 個以上的文字、數字或「-」的組合，例如 -abc-
        // (\.\w+))：@ 之前可以出現 1 個以上的文字、數字或「.」的組合，例如 .abc.
        // ((-\w+)|(\.\w+))*：以上兩個規則以 or 的關係出現，並且出現 0 次以上 (所以不能 –. 同時出現)
        // @：中間一定要出現一個 @
        // [A-Za-z0-9]+：@ 之後出現 1 個以上的大小寫英文及數字的組合
        // (\.|-)：@ 之後只能出現「.」或是「-」，但這兩個字元不能連續時出現
        // ((\.|-)[A-Za-z0-9]+)*：@ 之後出現 0 個以上的「.」或是「-」配上大小寫英文及數字的組合
        // \.[A-Za-z]+$/：@ 之後出現 1 個以上的「.」配上大小寫英文及數字的組合，結尾需為大小寫英文
        const emailRule = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/;
        this.contactForm = new FormGroup({
            'name': new FormControl(null, [Validators.required, Validators.maxLength(50)]),
            'contactNumber': new FormControl(null, [Validators.required, Validators.maxLength(8), Validators.minLength(8), Validators.pattern("^[0-9]*$")]),
            'email': new FormControl(null, [Validators.required, Validators.email, Validators.maxLength(250), Validators.pattern(emailRule)]),
            'problem': new FormControl("", [Validators.required, Validators.maxLength(2000)])
        })
    }

    ngAfterViewInit() {
        this.eventEmitterService.onLoadingComplete()
    }

    ngOnDestroy() {
        this.contactComponent.nativeElement.remove();
    }

    onSubmit() {
        this.infoService.postContact({
            name: this.contactForm.get('name').value,
            contactNumber: this.selectedNum + '-' + this.contactForm.get('contactNumber').value,
            email: this.contactForm.get('email').value,
            content: this.contactForm.get('problem').value
        }).subscribe(
            (response) => { },
            (error) => { console.error(error) },
            () => { this.router.navigate(['/']); }
        )
    }
}
