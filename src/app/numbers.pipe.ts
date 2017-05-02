import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'commaSeparatedNumber' })
export class CommaSeparatedNumberPipe implements PipeTransform {
  transform(args: any): any {
    if (args) {
      args = String(args).split(',').join('');
      if (!isNaN(args)) {
        let formatted = Number(args).toLocaleString();
        return formatted;
      }
      return '';
    }
  }
}
