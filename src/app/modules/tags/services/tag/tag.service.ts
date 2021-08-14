/* #region  Imports */

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseResponse } from '@core/models/BaseResponse';
import { BaseDataService } from '@core/services/base-data-service/base-data-service';
import { environment } from '@environments/environment';
import { TagListVm } from '../../models/tag-list-vm';

/* #endregion */

@Injectable({
  providedIn: 'root'
})
export class TagService extends BaseDataService<TagListVm> {

  constructor(
    http: HttpClient
  ) {
    super(http, `${environment.apiUrl}/Tag`);
  }

  activate(id: number, activate: boolean) {
    return this.http.put<BaseResponse<boolean>>(`${this.serviceBaseUrl}/Activate?id=${id}&activate=${activate}`, null)
  }

}
