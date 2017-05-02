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
    let input = $event.target.value.split('');
    let last = input.length - 1;
    if (input[last] === 'k' || input[last] === 'K') {
      input[last] = '000';
    }
    if (input[last] === 'm' || input[last] === 'M') {
      input[last] = '000000';
    }
    input = input.join('');
    this.value = input;
    this.ngModelChange.emit(this.value);
  }
}

