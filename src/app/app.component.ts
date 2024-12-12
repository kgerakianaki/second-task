import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
})
export class AppComponent {
  constructor(private translate: TranslateService) {
    this.initializeTranslation();
  }

  initializeTranslation() {
    this.translate.setDefaultLang('el'); // Set a fallback language
    this.translate.use('el'); // Set Greek as the active language
  }
}
