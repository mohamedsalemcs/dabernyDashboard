import { QueryPagedResult } from "./QueryPagedResult";
import { BaseResponse } from "./BaseResponse";

export interface PagedListResult<T> extends BaseResponse<QueryPagedResult<T>> {

}
