import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaseResponse } from '../../models/BaseResponse';
import { BaseSearchModel } from '../../models/BaseSearchModel';
import { ListResult } from '../../models/ListResult';
import { PagedListResult } from '../../models/PagedListResult';
import { BaseService } from '../base-service/base-service';



export class ReadableDataServiceService<T> extends BaseService {

  constructor(
    http: HttpClient,
    serviceBaseUrl: string) {
    super(http, serviceBaseUrl);
  }

  getPaged = <TResult = T>(searchModel?: BaseSearchModel): Observable<PagedListResult<TResult>> => {
    return this.http.get<PagedListResult<TResult>>(
      searchModel ? `${this.serviceBaseUrl}?${this.getQueryParams(searchModel)}` : `${this.serviceBaseUrl}`
    );
  }

  getAll = <TResult = T>(searchModel?: BaseSearchModel, apiName: string = 'ListAll'): Observable<ListResult<T>> => {
    return this.http.get<ListResult<T>>(
      `${this.serviceBaseUrl}/${apiName || 'ListAll'}?${this.getQueryParams(searchModel)}`
    );
  }

  getById<TResult = T>(id: number, idQueryStr: string = 'id'): Observable<BaseResponse<T>> {
    return this.http.get<BaseResponse<T>>(`${this.serviceBaseUrl}/GetById?${idQueryStr || 'id'}=${id || ''}`);
  }
}
