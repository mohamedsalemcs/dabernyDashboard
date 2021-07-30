import { BaseResponse } from "./BaseResponse";
import { QueryResult } from "./QueryResult";

export interface ListResult<T> extends BaseResponse<QueryResult<T>> {

}
