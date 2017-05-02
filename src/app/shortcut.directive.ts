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
    if (input[input.length - 1] === 'k') {
      input[input.length - 1] = '000';
    }
    if (input[input.length - 1] === 'm') {
      input[input.length - 1] = '000000';
    }
    input = Number(input.join(''));
    if (isNaN(input)) {
      input = 0;
    }
    this.value = input;
    this.ngModelChange.emit(this.value);
  }
}

