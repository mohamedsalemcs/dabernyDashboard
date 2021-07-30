import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '@core/base-component/base-component';
import { LanguageService } from '@core/services/language-service/language.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-questions-list',
  templateUrl: './questions-list.component.html',
  styleUrls: ['./questions-list.component.css']
})
export class QuestionsListComponent extends BaseComponent implements OnInit {

  /* #region  Prroperties & Fields */

  /* #endregion */

  /* #region  Parameters */

  /* #endregion */

  /* #region  Constructor */
  constructor(
    translate: TranslateService,
    languageService: LanguageService,
  ) {
    super(translate, languageService);
  }
  /* #endregion */

  /* #region  Events */
  ngOnInit() {
  }
  /* #endregion */

  /* #region  Methods */


  /* #endregion */
}

