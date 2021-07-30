export class FormDataHeplper {

  public static append(formData: FormData, key: string, value: any) {
    if (key && value && value[key]) {
      if (Array.isArray(value[key])) {
        for (let index = 0; index < value[key].length; index++) {
          formData.append(key, value[key][index]);
        }
      } else {
        formData.append(key, value[key]);
      }
    }
  }

  public static toFormData(object) {
    if (object) {
      const formData = new FormData();
      for (const key in object) {
        if (Object.prototype.hasOwnProperty.call(object, key)) {
          this.append(formData, key, object);
        }
      }
      return formData;
    } else {
      return null;
    }

  }

}
