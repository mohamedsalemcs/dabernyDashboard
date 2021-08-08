import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '@core/base-component/base-component';
import { Reflection } from '@core/helpers/reflection';
import { Column } from '@core/models/column';
import { PagedListMetaData } from '@core/models/PagedListMetaData';
import { AlertService } from '@core/services/alert-service/alert.service';
import { HeaderService } from '@core/services/header-service/header.service';
import { LanguageService } from '@core/services/language-service/language.service';
import { TranslateService } from '@ngx-translate/core';
import { InterestSM } from 'src/app/modules/auth/models/interest-sm';
import { Interest } from 'src/app/modules/profile/models/interest';
import { QuestionService } from 'src/app/modules/questions/services/question/question.service';
import { InterestService } from '../../services/interest/interest.service';

@Component({
  selector: 'app-interests-list',
  templateUrl: './interests-list.component.html',
  styleUrls: ['./interests-list.component.css']
})
export class InterestsListComponent extends BaseComponent implements OnInit {

  /* #region  Prroperties & Fields */
  isLoading: boolean;
  searchModel: InterestSM;
  itemsList: Interest[];
  metadata: PagedListMetaData;
  columns: Column[];
  showCreate: boolean;
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
    private interestService: InterestService,
    private headerService: HeaderService
  ) {
    super(translate, languageService);
  }
  /* #endregion */

  /* #region  Events */
  ngOnInit() {
    this.headerService.changeTile('Interests List');
    this.reset();
    this.setColumns();
    this.loadData();
  }
  /* #endregion */

  /* #region  Methods */
  setColumns() {
    this.columns = [
      {
        field: 'name',
        header: 'Interest Name'
      },
      {
        field: 'isActive',
        header: 'Active',
        type: 'status'
      },
      {
        type: 'action',
        field: '',
        header: ''
      },
    ];
  }
  reset() {
    this.searchModel = new InterestSM(null);
    this.isLoading = false;
    this.itemsList = null;
    this.metadata = null;
  }
  loadDataLazy() {
    if (this.metadata.pageNumber < this.metadata.pageCount) {
      this.metadata.pageNumber++;
      this.searchModel.page++;
      this.loadData();
    }
  }

  loadData() {
    this.isLoading = true;
    this.interestService.getAll(this.searchModel)
      .subscribe(response => {
        this.isLoading = false;
        if (response && response.success) {
          this.itemsList = response.resource.items;
        } else {
          this.alertService.errorMsg(response.message || 'errors.errorOccured');
        }
      },
        error => {
          this.isLoading = false;
          this.alertService.error(error);
        });
  }

  activate(interest: Interest) {
    this.alertService.confirmMessage('confirmActivateInterest', () => {
      this.isLoading = true;
      this.interestService.activate(interest.id, true)
        .subscribe(
          response => {
            this.isLoading = false;
            if (response && response.success) {
              this.alertService.successMsg('Interest activated');
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

  }
  deactivate(interest: Interest) {
    this.alertService.confirmMessage('confirmDeactivateInterest', () => {
      this.isLoading = true;
      this.interestService.activate(interest.id, false)
        .subscribe(
          response => {
            this.isLoading = false;
            if (response && response.success) {
              this.alertService.successMsg('Interest deactivated');
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

  }
  update(interest: Interest) {

  }
  showCreateDialog() {
    this.showCreate = true;
  }
  closeModal() {
    this.showCreate = false;
  }
  onSaved() {
    this.showCreate = false;
    this.loadData();
  }
  /* #endregion */
}

