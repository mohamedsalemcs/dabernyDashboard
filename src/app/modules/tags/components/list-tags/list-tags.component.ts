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

@Component({
  selector: 'app-list-tags',
  templateUrl: './list-tags.component.html',
  styleUrls: ['./list-tags.component.css']
})
export class ListTagsComponent extends BaseComponent implements OnInit {

  /* #region  Prroperties & Fields */
  isLoading: boolean;
  //searchModel: TagSM;
  //itemsList: tag[];
  metadata: PagedListMetaData;
  columns: Column[];
  searchModel: any;
  itemsList: any;
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
    // this.reset();
    this.setColumns();
    // this.loadData();
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
    // this.searchModel = new TagSM(null);
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
}
