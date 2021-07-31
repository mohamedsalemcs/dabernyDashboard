
import { TranslateService } from '@ngx-translate/core';
import { Language } from 'src/app/modules/core/enums/language';
import { AppUrls } from '../helpers/app-urls';
import { LanguageService } from '../services/language-service/language.service';

export class BaseComponent {

  /* #region  Properties &Fields */
  currentLang: Language;
  get Language() {
    return Language;
  }
  get AppUrls() {
    return AppUrls;
  }

  /* #endregion */

  /* #region  Constructor */
  constructor(
    public translate: TranslateService,
    public languageService: LanguageService) {
    this.languageService.LangChanged.subscribe(value => {
      this.translate.use(value);
      this.currentLang = value;
    });
  }
  /* #endregion */

}
