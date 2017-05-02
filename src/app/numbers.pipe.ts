import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'commaSeparatedNumber' })
export class CommaSeparatedNumberPipe implements PipeTransform {
  transform(args: any): any {
    if (args) {
      args = String(args).split(',').join('');
      console.log(args);
      let formatted = Number(args).toLocaleString();
      console.log(formatted);
      return formatted;
    }
  }
}
