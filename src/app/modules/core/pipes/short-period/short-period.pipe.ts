import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';
import { DateHelper } from '../../helpers/date-helper';
import { Periods } from './periods';

@Pipe({
  name: 'shortPeriod'
})
export class ShortPeriodPipe implements PipeTransform {
  constructor(
    private datePipe: DatePipe
  ) {

  }
  transform(dateStr: string, toLocal: any = true): any {
    if (!dateStr) {
      return null;
    }
    const number = DateHelper.getDefferanceFromNow(dateStr, toLocal);

    let abs = Math.abs(number);
    // more than a week return date
    if (abs < (1000 * 60)) {
      return 'Just Now'
    } else if (abs <= (1000 * 60 * 60 * 24 * 7)) {
      const isNegative = number < 0;

      let key = '';
      for (let i = 0; i < Periods.length; i++) {
        let reduced = abs / Periods[i].value;
        reduced = Math.round(reduced);
        if (reduced >= 1) {
          abs = reduced;
          key = Periods[i].key;
          break;
        }
      }
      return (isNegative ? '-' : '') + abs + key + ' ';
    } else {
      return this.datePipe.transform(DateHelper.toLocalDateFromStr(dateStr), 'd MMM, y');
    }

  }

}
