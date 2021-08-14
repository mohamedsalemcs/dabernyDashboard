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
import { SearchModel } from '@core/models/searchmodel';
import { TagListVm } from '../../models/tag-list-vm';

@Component({
  selector: 'app-list-tags',
  templateUrl: './list-tags.component.html',
  styleUrls: ['./list-tags.component.css']
})
export class ListTagsComponent extends BaseComponent implements OnInit {

  /* #region  Prroperties & Fields */
  isLoading: boolean;
  searchModel: SearchModel;
  itemsList: TagListVm[];
  metadata: PagedListMetaData;
  columns: Column[];
  showCreate: boolean;
  showUpdate: boolean;
  idToUpdate: number;
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
    private tagService: TagService,
    private headerService: HeaderService
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
        field: 'nameAr',
        header: 'nameAr'
      },
      {
        field: 'nameEn',
        header: 'nameEn'
      },
      {
        field: 'isActive',
        header: 'status',
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
    this.searchModel = new SearchModel();
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
    this.tagService.getAll(this.searchModel, 'GetAll')
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

  activate(tag: TagListVm) {
    this.alertService.confirmMessage('confirmActivateTag', () => {
      this.isLoading = true;
      this.tagService.activate(tag.id, true)
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
  deactivate(tag: TagListVm) {
    this.alertService.confirmMessage('confirmDeactivateTag', () => {
      this.isLoading = true;
      this.tagService.activate(tag.id, false)
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

  showCreateDialog() {
    this.showCreate = true;
  }
  showUpdateDialog(id: number) {
    this.idToUpdate = id;
    this.showUpdate = true;
  }
  closeModal() {
    this.idToUpdate = null;
    this.showCreate = false;
    this.showUpdate = false;
  }
  onSaved() {
    this.idToUpdate = null;
    this.showCreate = false;
    this.showCreate = false;
    this.loadData();
  }
  /* #endregion */
}

