import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '@core/base-component/base-component';
import { LanguageService } from '@core/services/language-service/language.service';
import { TranslateService } from '@ngx-translate/core';
import { QuestionSM } from '../../models/question-sm';
import { ConfirmationService, LazyLoadEvent } from 'primeng/api';
import { AlertService } from '@core/services/alert-service/alert.service';
import { QuestionService } from '../../services/question/question.service';
import { QuestionListVM } from '../../models/question-list-vm';
import { map } from 'rxjs/operators';
import { PagedListMetaData } from '@core/models/PagedListMetaData';
import { Reflection } from '@core/helpers/reflection';
import { QuestionStatus } from '../../models/question-status';
import { HeaderService } from '@core/services/header-service/header.service';

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
  get QuestionStatus() {
    return QuestionStatus;
  }
  get Reflection() {
    return Reflection;
  }
  /* #endregion */

  /* #region  Parameters */

  /* #endregion */

  /* #region  Constructor */
  constructor(
    translate: TranslateService,
    languageService: LanguageService,
    private alertService: AlertService,
    private questionService: QuestionService,
    private confirmationService: ConfirmationService,
    private headerService: HeaderService
  ) {
    super(translate, languageService);
  }
  /* #endregion */

  /* #region  Events */
  ngOnInit() {
    this.headerService.changeTile('Questions List');
    this.reset();
    this.setColumns();
    this.loadData();
  }
  /* #endregion */

  /* #region  Methods */
  setColumns() {
    this.columns = [
      {
        field: 'userProfile.user.fullName',
        header: 'fullName'
      },
      {
        field: 'title',
        header: 'title'
      },
      {
        field: 'option1',
        header: 'option1'
      },
      {
        field: 'option2',
        header: 'option2'
      },
      {
        field: 'option3',
        header: 'option3'
      },
      {
        field: 'option4',
        header: 'option4'
      },
      {
        type: 'action',
        field: '',
        header: ''
      },
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
          this.alertService.errorMsg(response.message || 'errors.errorOccured');
        }
      },
        error => {
          this.isLoading = false;
          this.alertService.error(error);
        });
  }

  delete(question: QuestionListVM) {
    this.alertService.confirmMessage('confirmDeleteQuestion', () => {
      this.isLoading = true;
      this.questionService.delete(question.id)
        .subscribe(
          response => {
            this.isLoading = false;
            if (response && response.success) {
              this.alertService.successMsg('Question Deleted');
              this.reset();
              this.loadData();
            } else {
              this.alertService.errorMsg(response.message || 'errors.errorOccured');
            }
          },
          err => {
            this.isLoading = false;
            this.alertService.error(err);

          });
    });
    // this.alertService.confirm({
    //   message: this.translate.instant('confirmDeleteQuestion'),
    //   header: this.translate.instant('confirm'),
    //   acceptLabel: this.translate.instant('Yes'),
    //   rejectLabel: this.translate.instant('No'),

    //   accept: () => {

    //     this.isLoading = true;
    //     this.questionService.delete(question.id)
    //       .subscribe(
    //         response => {
    //           this.isLoading = false;
    //           if (response && response.success) {
    //             this.reset();
    //             this.loadData();
    //           } else {
    //             this.alertService.showErrorMsg(response.message || 'errors.errorOccured');
    //           }
    //         },
    //         err => {
    //           this.isLoading = false;
    //           this.alertService.error(err);

    //         });
    //   }
    // });
  }
  /* #endregion */
}

