import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: []
})
export class AppComponent {
  title = 'toyota-kinto-angular';

  IsLoaderShowed: boolean = true;

  constructor() {
    setTimeout(() => { this.IsLoaderShowed = false; }, 2000);
  }
}
