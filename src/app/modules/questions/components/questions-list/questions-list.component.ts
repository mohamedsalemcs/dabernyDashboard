import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '@core/base-component/base-component';
import { LanguageService } from '@core/services/language-service/language.service';
import { TranslateService } from '@ngx-translate/core';
import { QuestionSM } from '../../models/question-sm';
import { MessageService, ConfirmationService, LazyLoadEvent } from 'primeng/api';
import { AlertService } from '@core/services/alert-service/alert.service';
import { QuestionService } from '../../services/question/question.service';
import { QuestionListVM } from '../../models/question-list-vm';
import { map } from 'rxjs/operators';
import { PagedListMetaData } from '@core/models/PagedListMetaData';

@Component({
  selector: 'app-questions-list',
  templateUrl: './questions-list.component.html',
  styleUrls: ['./questions-list.component.css']
})
export class QuestionsListComponent extends BaseComponent implements OnInit {

  /* #region  Prroperties & Fields */
  isLoading: boolean;
  searchModel: QuestionSM;
  itemsList: QuestionListVM[];
  metadata: PagedListMetaData;
  columns: {
    field: string;
    header: string;
    hidden?: boolean;
    type?: string;
    pipeFormat?: string;
  }[];
  /* #endregion */

  /* #region  Parameters */

  /* #endregion */

  /* #region  Constructor */
  constructor(
    translate: TranslateService,
    languageService: LanguageService,
    private alertService: AlertService,
    private questionService: QuestionService
  ) {
    super(translate, languageService);
  }
  /* #endregion */

  /* #region  Events */
  ngOnInit() {
    this.reset();
    this.setColumns();
    this.loadData();
  }
  /* #endregion */

  /* #region  Methods */
  setColumns() {
    this.columns = [
      {
        field: '',
        header: ''
      }
    ];
  }
  reset() {
    this.searchModel = new QuestionSM(null);
    this.isLoading = false;
    this.itemsList = null;
    this.metadata = null;
  }
  loadDataLazy(event: LazyLoadEvent) {
    if (this.metadata.pageNumber < this.metadata.pageCount) {
      this.metadata.pageNumber++;
      this.searchModel.page++;
      this.loadData();
    }
  }

  loadData() {
    this.isLoading = true;
    this.questionService.getPaged(this.searchModel).pipe(map(res => {
      this.questionService.configureQuestionsVotesPercent(res.resource.items);
      return res;
    }))
      .subscribe(response => {
        this.isLoading = false;
        if (response && response.success) {
          this.itemsList = response.resource.items;
          this.metadata = response.resource.metadata;
        } else {
          this.alertService.errorMessage(response.message || 'errors.errorOccured');
        }
      },
        error => {
          this.isLoading = false;
          if (error && error.error) {
            if (error.error.message) {
              this.alertService.showErrorMsg(error.error.message);
            } else if (error.error.messages && error.error.messages.length > 0) {
              this.alertService.showErrorMsg(error.error.messages.join(' \n ') || 'errors.errorOccured');
            }
          } else {
            this.alertService.showErrorMsg('errors.errorOccured');
          }
        });
  }
  /* #endregion */
}

