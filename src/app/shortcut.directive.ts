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
    let lastLetter = input[input.length - 1]
    if (lastLetter === 'k' || lastLetter === 'K') {
      lastLetter = '000';
    }
    if (lastLetter === 'm' || lastLetter === 'M') {
      lastLetter = '000000';
    }
    input = Number(input.join(''));
    if (isNaN(input)) {
      input = 0;
    }
    this.value = input;
    this.ngModelChange.emit(this.value);
  }
}