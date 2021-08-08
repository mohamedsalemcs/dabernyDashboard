import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FormDataHeplper } from '../../helpers/form-data-helper';
import { BaseResponse } from '../../models/BaseResponse';
import { ReadableDataServiceService } from '../readable-data-service/readable-data-service.service';

export abstract class BaseDataService<T> extends ReadableDataServiceService<T> {

  constructor(
    http: HttpClient,
    serviceBaseUrl: string) {
    super(http, serviceBaseUrl);
  }

  create<TEntity = T, TResult = T>(entity: TEntity, isFormData: boolean = false): Observable<BaseResponse<TResult>> {
    return this.http.post<BaseResponse<TResult>>(this.serviceBaseUrl, isFormData == true ? FormDataHeplper.toFormData(entity) : entity);
  }

  update<TEntity = T, TResult = T>(entity: TEntity, isFormData: boolean = false, updateSegmant?: string): Observable<BaseResponse<TResult>> {
    return this.http.put<BaseResponse<TResult>>(this.serviceBaseUrl + updateSegmant || '', isFormData == true ? FormDataHeplper.toFormData(entity) : entity);
  }

}
