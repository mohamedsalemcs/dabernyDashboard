/* #region  Imports */

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseResponse } from '@core/models/BaseResponse';
import { environment } from '@environments/environment';
import { ReadableDataServiceService } from 'src/app/modules/core/services/readable-data-service/readable-data-service.service';
import { TagListVm } from '../../models/tag-list-vm';

/* #endregion */

@Injectable({
  providedIn: 'root'
})
export class TagService extends ReadableDataServiceService<TagListVm> {

  constructor(
    http: HttpClient
  ) {
    super(http, `${environment.apiUrl}/Tag`);
  }

  activate(id: number, activate: boolean) {
    return this.http.put<BaseResponse<boolean>>(`${this.serviceBaseUrl}/Activate?id=${id}&activate=${activate}`, null)
  }

}
