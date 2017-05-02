import { Directive, ElementRef, Output, Input, EventEmitter } from '@angular/core';

@Directive({
  selector: '[ngModel][shortcut]',
  host: {
    "(input)": 'onInputChange($event)'
  }
})
  
export class ShortCutDirective {

  constructor(private el: ElementRef) { }
  @Output() ngModelChange: EventEmitter<any> = new EventEmitter()
  value: any

  onInputChange($event: any) {
    /* -- Turn input into array for easy manipulation --*/
    let input = $event.target.value.split('');
    let last = input.length - 1;
    /* -- Convert k or m into corresponding 0's --*/
    if (input[last] === 'k' || input[last] === 'K') {
      input[last] = '000';
    }
    if (input[last] === 'm' || input[last] === 'M') {
      input[last] = '000000';
    }
    /* -- Join array to produce string --*/
    input = input.join('');
    this.value = input;
    this.ngModelChange.emit(this.value);
  }
}

