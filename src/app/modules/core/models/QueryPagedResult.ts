import { PagedListMetaData } from "./PagedListMetaData";

export interface QueryPagedResult<T> {
  items: T[];
  metadata: PagedListMetaData;
}


