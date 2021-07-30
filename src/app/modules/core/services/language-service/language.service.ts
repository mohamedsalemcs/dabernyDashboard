import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { Language } from 'src/app/modules/core/enums/language';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private lang: Language;
  private langKey = environment.langKey;
  private enFiles: { url: string; id: string }[];
  private arFiles: { url: string; id: string }[];
  changedLang = false;
  public LangChanged: BehaviorSubject<Language> = new BehaviorSubject<Language>(
    this.Lang
  );
  loadedFilesCounter: number;

  public get Lang() {
    return this.lang;
  }

  constructor(private translate: TranslateService) {
    this.setLanguageIfNotExists();
    translate.setDefaultLang(environment.defaultLanguage);
  }

  private setLanguageIfNotExists() {
    this.lang = localStorage.getItem(this.langKey) as Language;
    if (
      !this.lang ||
      (this.lang !== Language.Arabic && this.lang !== Language.English)
    ) {
      this.lang = environment.defaultLanguage;
      localStorage.setItem(this.langKey, this.lang);
    }
    this.setLanguage(this.lang);
  }

  setLanguage(lang: Language) {
    if (!lang || (lang !== Language.Arabic && lang !== Language.English)) {
      this.lang = environment.defaultLanguage;
    } else {
      this.lang = lang;
    }
    localStorage.setItem(this.langKey, this.lang);

    this.translate.use(this.lang);
    if (this.LangChanged.value !== this.lang) {
      document.documentElement.setAttribute('dir', this.lang === Language.Arabic ? 'rtl' : 'ltr');
      document.documentElement.setAttribute('lang', this.lang);
      this.LangChanged.next(this.lang);
    }
  }


  disableLink(id) {
    const cssLink = document.querySelector(`head #${id}`) as HTMLLinkElement;
    if (cssLink) {
      cssLink.disabled = true;
    }
  }
}
