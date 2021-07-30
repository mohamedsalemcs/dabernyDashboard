export class DateHelper {
  public static toLocalDate(date: Date) {
    const d = new Date();
    if (date) {
      d.setTime(date.getTime() + date.getTimezoneOffset() * -60 * 1000);
    }
    return d;
  }

  public static toLocalDateFromStr(dateStr: string) {
    if (dateStr) {
      return this.toLocalDate(new Date(dateStr));
    }
  }

  public static getDefferanceFromNow(dateStr: string, toLocal: boolean = true) {
    if (dateStr) {
      if (toLocal === true) {
        return new Date().getTime() - this.toLocalDateFromStr(dateStr).getTime();
      } else {
        return new Date().getTime() - new Date(dateStr).getTime();
      }
    }
  }


}
