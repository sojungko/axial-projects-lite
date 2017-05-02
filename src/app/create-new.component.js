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
            'target_check_size_min': '',
            'target_check_size_max': '',
            'target_revenue_min': '',
            'target_revenue_max': '',
            'target_ebitda_min': '',
            'target_ebitda_max': '',
        };
        this.validationMessages = {
            'headline': {
                'required': 'Required'
            },
            'target_check_size_min': {
                'max': 'Cannot exceed maximum',
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
        console.log('this.currentForm : ', this.currentForm);
        console.log('this.projectForm: ', this.projectForm);
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
    CreateNewComponent.prototype.onSubmit = function (projectForm) {
        var _this = this;
        console.log(projectForm.value);
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