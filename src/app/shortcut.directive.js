"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var ShortCutDirective = (function () {
    function ShortCutDirective(el) {
        this.el = el;
        this.ngModelChange = new core_1.EventEmitter();
    }
    ShortCutDirective.prototype.onInputChange = function ($event) {
        var input = $event.target.value.split('');
        var last = input.length - 1;
        if (input[last] === 'k' || input[last] === 'K') {
            input[last] = '000';
        }
        if (input[last] === 'm' || input[last] === 'M') {
            input[last] = '000000';
        }
        input = Number(input.join(''));
        if (isNaN(input)) {
            input = '';
        }
        this.value = input;
        this.ngModelChange.emit(this.value);
    };
    return ShortCutDirective;
}());
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], ShortCutDirective.prototype, "ngModelChange", void 0);
ShortCutDirective = __decorate([
    core_1.Directive({
        selector: '[ngModel][shortcut]',
        host: {
            "(input)": 'onInputChange($event)'
        }
    }),
    __metadata("design:paramtypes", [core_1.ElementRef])
], ShortCutDirective);
exports.ShortCutDirective = ShortCutDirective;
//# sourceMappingURL=shortcut.directive.js.map