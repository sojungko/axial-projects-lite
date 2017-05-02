import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'commaSeparatedNumber' })
export class CommaSeparatedNumberPipe implements PipeTransform {
  transform(args: any): any {
    if (args) {
      args = Number(args);
      let formatted = args.toLocaleString();
      return formatted;
    }
  }
}
