import { Pipe, PipeTransform } from '@angular/core';
import { Powers } from './powers';

@Pipe({
  name: 'shortNumber'
})
export class ShortNumberPipe implements PipeTransform {

  transform(number: number | string, args?: any): any {
    number = Number(number);
    if (number === 0) {
      return number + ' ';
    }
    if (number === null || number === undefined || isNaN(number)) {
      return null
    }

    let abs = Math.abs(number);
    const rounder = Math.pow(10, 1);
    const isNegative = number < 0;

    let key = '';
    for (let i = 0; i < Powers.length; i++) {
      let reduced = abs / Powers[i].value;
      reduced = Math.round(reduced * rounder) / rounder;
      if (reduced >= 1) {
        abs = reduced;
        key = Powers[i].key;
        break;
      }
    }
    return (isNegative ? '-' : '') + abs + key + ' ';
  }

}
