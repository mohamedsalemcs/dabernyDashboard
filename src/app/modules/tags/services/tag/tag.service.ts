/* #region  Imports */

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { ReadableDataServiceService } from 'src/app/modules/core/services/readable-data-service/readable-data-service.service';
import { TagListVm } from '../../models/tag-list-vm';

/* #endregion */

@Injectable({
  providedIn: 'root'
})
export class TagService extends ReadableDataServiceService<TagListVm> {

  /* #region  Constructor */
  constructor(
    http: HttpClient
  ) {
    super(http, `${environment.apiUrl}/Tag`);
  }
  /* #endregion */

}
