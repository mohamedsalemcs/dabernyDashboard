import { TranslateService } from '@ngx-translate/core';
import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { LanguageService } from '../language-service/language.service';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {
  title: string;

  constructor(
    private translate: TranslateService,
    private titleService: Title,
    private languageService: LanguageService,
  ) {
    setTimeout(() => {
      this.languageService.LangChanged.subscribe(() => {
        this.changeTile(this.title);
      });
    }, 0);

  }
  changeTile(title: string) {
    this.title = title;
    this.titleService.setTitle(`${this.translate.instant('appName')} :: ${title ? this.translate.instant(title) : ''}`);
  }
}
