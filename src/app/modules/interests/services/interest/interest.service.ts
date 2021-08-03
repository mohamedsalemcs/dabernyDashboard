import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseResponse } from '@core/models/BaseResponse';
import { BaseDataService } from '@core/services/base-data-service/base-data-service';
import { environment } from '@environments/environment';
import { Interest } from 'src/app/modules/profile/models/interest';

@Injectable({
  providedIn: 'root'
})
export class InterestService extends BaseDataService<Interest> {

  constructor(
    http: HttpClient
  ) {
    super(http, `${environment.apiUrl}/Interest`);
  }
  activate(id: number, activate: boolean) {
    return this.http.put<BaseResponse<boolean>>(`${this.serviceBaseUrl}/Activate?id=${id}&activate=${activate}`, null)
  }
}
