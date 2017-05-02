import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'commaSeparatedNumber' })
export class CommaSeparatedNumberPipe implements PipeTransform {
  transform(args: string[]): any {
    console.log('args : ', args);
    return args;
  }
}
