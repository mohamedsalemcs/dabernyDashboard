export class QueryParamsHelper {

  public static getQueryParams(searchModel) {
    let params = '';
    for (const key in searchModel) {
      if (searchModel.hasOwnProperty(key)) {
        if (params) {
          if (
            key &&
            searchModel[key] !== '' &&
            searchModel[key] !== null &&
            searchModel[key] !== undefined
          ) {
            if (Array.isArray(searchModel[key])) {
              params +=
                searchModel[key].length > 0
                  ? `&${this.getParamsFromArray(key, searchModel[key])}`
                  : '';
            } else {
              params += `&${key}=${searchModel[key]}`;
            }
          }
        } else {
          if (
            key &&
            searchModel[key] !== '' &&
            searchModel[key] !== null &&
            searchModel[key] !== undefined
          ) {
            if (Array.isArray(searchModel[key])) {
              params +=
                searchModel[key].length > 0
                  ? `${this.getParamsFromArray(key, searchModel[key])}`
                  : '';
            } else {
              params += `${key}=${searchModel[key]}`;
            }
          }
        }
      }
    }
    return params;
  }
  private static getParamsFromArray(fieldName: string, array: any[]) {
    if (fieldName && array && array.length > 0) {
      let params = '';

      for (let index = 0; index < array.length; index++) {
        const searchModel = array[index];
        for (const key in searchModel) {
          if (searchModel.hasOwnProperty(key)) {
            if (
              key &&
              searchModel[key] !== '' &&
              searchModel[key] !== null &&
              searchModel[key] !== undefined
            ) {
              params += params ? '&' : '';
              params += `${fieldName}[${index}].${key}=${searchModel[key]}`;
            }
          }
        }
      }
      return params;
    }
  }
}
