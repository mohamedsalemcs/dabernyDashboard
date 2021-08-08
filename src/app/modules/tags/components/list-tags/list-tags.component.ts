import { Tag } from './../../../profile/models/tag';
import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '@core/base-component/base-component';
import { Reflection } from '@core/helpers/reflection';
import { Column } from '@core/models/column';
import { PagedListMetaData } from '@core/models/PagedListMetaData';
import { AlertService } from '@core/services/alert-service/alert.service';
import { HeaderService } from '@core/services/header-service/header.service';
import { LanguageService } from '@core/services/language-service/language.service';
import { TranslateService } from '@ngx-translate/core';
import { TagService } from '../../services/tag/tag.service';
import { InterestSM } from 'src/app/modules/auth/models/interest-sm';
import { Interest } from 'src/app/modules/profile/models/user-profile-interest';

@Component({
  selector: 'app-list-tags',
  templateUrl: './list-tags.component.html',
  styleUrls: ['./list-tags.component.css']
})
export class ListTagsComponent extends BaseComponent implements OnInit {

  /* #region  Prroperties & Fields */
  isLoading: boolean;
  searchModel: InterestSM;
  itemsList: any[];
  metadata: PagedListMetaData;
  columns: Column[];
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
    private headerService: HeaderService,
    private tagService: TagService
  ) {
    super(translate, languageService);
  }
  /* #endregion */

  /* #region  Events */
  ngOnInit() {
    this.headerService.changeTile('Tags List');
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
        header: 'Tag Name'
      },
      {
        field: 'status',
        header: 'Status'
      },
      {
        type: 'action',
        field: '',
        header: 'Action'
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
    this.tagService.getAll(this.searchModel)
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
      this.tagService.activate(interest.id, true)
        .subscribe(
          response => {
            this.isLoading = false;
            if (response && response.success) {
              this.alertService.successMsg('Tag activated');
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
      this.tagService.activate(interest.id, false)
        .subscribe(
          response => {
            this.isLoading = false;
            if (response && response.success) {
              this.alertService.successMsg('Tag deactivated');
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

}
