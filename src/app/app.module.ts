import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxUsefulSwiperModule } from 'ngx-useful-swiper';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HomeComponent } from './main/home/home.component';
import { AllModelsComponent } from './main/all-models/all-models.component';
import { ModelContentComponent } from './main/model-content/model-content.component';
import { TermConditionComponent } from './main/term-condition/term-condition.component';
import { ApplicationFormComponent } from './main/application-form/application-form.component';
import { ApplicationSubmittedComponent } from './main/application-submitted/application-submitted.component';
import { NewsComponent } from './main/news/news.component';
import { HeaderComponent } from './layouts/header/header.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { LoaderComponent } from './layouts/loader/loader.component';
import { GoTopComponent } from './layouts/goTop/goTop.component';
import { PopupComponent } from './layouts/popup/popup.component';
import { IsAniDirective } from './shared/is-amimated.directive';
import { NewsContentComponent } from './main/news-content/news-content.component';
import { AboutComponent } from './main/about/about.component';
import { ApplyComponent } from './main/apply/apply.component';
import { FAQComponent } from './main/faq/faq.component';
import { ContactComponent } from './main/contact/contact.component';
import { TermsComponent } from './main/terms/terms.component';
import { TypeFilterLengthPipe, TypeFilterObjectPipe, ModelFilterBrandPipe, ModelFilterCatePipe, CateFilterBrandPipe, SafeHtmlPipe } from './shared/typeFilter.pipe';

// Routes Path and Components
const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'models', component: AllModelsComponent },
  { path: 'models-content/:id', component: ModelContentComponent },
  { path: 'term-condition', component: TermConditionComponent },
  { path: 'application-form', component: ApplicationFormComponent },
  { path: 'application-submitted', component: ApplicationSubmittedComponent },
  { path: 'news', component: NewsComponent },
  { path: 'news-content/:id', component: NewsContentComponent },
  { path: 'about', component: AboutComponent },
  { path: 'apply', component: ApplyComponent },
  { path: 'faq', component: FAQComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'terms', component: TermsComponent },
  { path: '**', redirectTo: "/" },
];

@NgModule({
  declarations: [
    IsAniDirective,
    AppComponent,
    LoaderComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    GoTopComponent,
    AllModelsComponent,
    ModelContentComponent,
    TermConditionComponent,
    ApplicationFormComponent,
    ApplicationSubmittedComponent,
    NewsComponent,
    NewsContentComponent,
    AboutComponent,
    ApplyComponent,
    FAQComponent,
    ContactComponent,
    TermsComponent,
    TypeFilterLengthPipe,
    TypeFilterObjectPipe,
    ModelFilterBrandPipe,
    ModelFilterCatePipe,
    CateFilterBrandPipe,
    SafeHtmlPipe,
    PopupComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    NgxUsefulSwiperModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
