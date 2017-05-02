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
var router_1 = require("@angular/router");
var forms_1 = require("@angular/forms");
var project_service_1 = require("./project.service");
var CreateNewComponent = (function () {
    function CreateNewComponent(projectService, router) {
        this.projectService = projectService;
        this.router = router;
        this.formErrors = {
            'headline': '',
        };
        this.validationMessages = {
            'headline': {
                'required': 'Required'
            },
        };
    }
    CreateNewComponent.prototype.ngAfterViewChecked = function () {
        this.formChanged();
    };
    CreateNewComponent.prototype.formChanged = function () {
        var _this = this;
        if (this.currentForm === this.projectForm) {
            return;
        }
        this.projectForm = this.currentForm;
        if (this.projectForm) {
            this.projectForm.valueChanges
                .subscribe(function (data) { return _this.onValueChanged(data); });
        }
    };
    CreateNewComponent.prototype.onValueChanged = function (data) {
        if (!this.projectForm) {
            return;
        }
        var form = this.projectForm.form;
        for (var field in this.formErrors) {
            // clear previous error message (if any)
            this.formErrors[field] = '';
            var control = form.get(field);
            if (control && control.dirty && !control.valid) {
                var messages = this.validationMessages[field];
                for (var key in control.errors) {
                    this.formErrors[field] += messages[key] + ' ';
                }
            }
        }
    };
    CreateNewComponent.prototype.isNumber = function (input) {
        return !(/[^0-9,.]/g).test(input);
    };
    CreateNewComponent.prototype.isDirty = function (input) {
        if (this.projectForm) {
            var field = this.projectForm.controls[input];
            return field.dirty;
        }
    };
    CreateNewComponent.prototype.minMaxBalance = function (min, max) {
        if (min && max) {
            var minNumber = Number(min.split(',').join(''));
            var maxNumber = Number(max.split(',').join(''));
            return minNumber > maxNumber;
        }
    };
    CreateNewComponent.prototype.minMaxControl = function (min, max) {
        /* -- disable button if min > max or one field is empty -- */
        if (min.value && max.value) {
            var minNumber = Number(min.value.split(',').join(''));
            var maxNumber = Number(max.value.split(',').join(''));
            return minNumber > maxNumber;
        }
        return min.value && (max.pristine || !max.value) || max.value && (min.pristine || !min.value);
    };
    CreateNewComponent.prototype.allNumber = function (input) {
        return input.every(function (element) {
            if (element.value) {
                var numberified = Number(element.value.split(',').join(''));
            }
            return !element.value || !isNaN(numberified);
        });
    };
    CreateNewComponent.prototype.disableButton = function () {
        if (this.projectForm) {
            var form = this.projectForm.form.controls;
            var headline = form.headline;
            var check_size_min = form.target_check_size_min;
            var check_size_max = form.target_check_size_max;
            var revenue_min = form.target_revenue_min;
            var revenue_max = form.target_revenue_max;
            var ebitda_min = form.target_ebitda_min;
            var ebitda_max = form.target_ebitda_max;
            var dirty = [];
            for (var field in form) {
                if (field !== 'headline') {
                    dirty.push(form[field]);
                }
            }
            var headlineInvalid = !headline.value || headline.value.length === 0;
            var minMaxFail = this.minMaxControl(check_size_min, check_size_max) || this.minMaxControl(revenue_min, revenue_max) || this.minMaxControl(ebitda_min, ebitda_max);
            if (!headline.value || headline.value.length === 0) {
                return true;
            }
            if (minMaxFail) {
                return true;
            }
            if (!this.allNumber(dirty)) {
                return true;
            }
            return false;
        }
    };
    CreateNewComponent.prototype.onSubmit = function (projectForm) {
        var _this = this;
        this.projectService.create(projectForm.value)
            .then(function () { return _this.goBack(); });
    };
    CreateNewComponent.prototype.goBack = function () {
        this.router.navigate(['/projects']);
    };
    return CreateNewComponent;
}());
__decorate([
    core_1.ViewChild('projectForm'),
    __metadata("design:type", forms_1.NgForm)
], CreateNewComponent.prototype, "currentForm", void 0);
CreateNewComponent = __decorate([
    core_1.Component({
        selector: 'create-new',
        templateUrl: './create-new.component.html'
    }),
    __metadata("design:paramtypes", [project_service_1.ProjectService,
        router_1.Router])
], CreateNewComponent);
exports.CreateNewComponent = CreateNewComponent;
//# sourceMappingURL=create-new.component.js.map