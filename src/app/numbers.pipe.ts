import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'commaSeparatedNumber' })
export class CommaSeparatedNumberPipe implements PipeTransform {
  transform(args: any): any {
    if (args) {
      /* -- Remove commas from input -- */
      args = String(args).split(',').join('');
      if (!isNaN(args)) {
        /* -- If args is number, format it --*/
        let formatted = Number(args).toLocaleString();
        return formatted;
      }
      /* -- If args is not number, return empty string --*/
      return '';
    }
  }
}
