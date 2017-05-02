"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
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
var forms_1 = require("@angular/forms");
var router_1 = require("@angular/router");
var common_1 = require("@angular/common");
var project_service_1 = require("./project.service");
var project_1 = require("./project");
var ProjectEditComponent = (function () {
    function ProjectEditComponent(projectService, router, location) {
        this.projectService = projectService;
        this.router = router;
        this.location = location;
        this.submit = new core_1.EventEmitter();
        this.update = new core_1.EventEmitter();
        this.formErrors = {
            'headline': '',
        };
        this.validationMessages = {
            'headline': {
                'required': 'Required'
            },
        };
    }
    ProjectEditComponent.prototype.onSubmit = function (projectForm) {
        var _this = this;
        this.submitted = !this.submitted;
        console.log(projectForm.value);
        var submitting = __assign({}, projectForm.value, { id: this.project.id });
        this.projectService.update(submitting)
            .then(function (project) {
            _this.submit.emit(true);
        });
    };
    ProjectEditComponent.prototype.ngAfterViewChecked = function () {
        this.formChanged();
    };
    ProjectEditComponent.prototype.formChanged = function () {
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
    ProjectEditComponent.prototype.onValueChanged = function (data) {
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
    ProjectEditComponent.prototype.isNumber = function (input) {
        console.log(typeof input);
        return typeof input === "number";
    };
    ProjectEditComponent.prototype.isDirty = function (input) {
        if (this.projectForm) {
            console.log(this.projectForm.controls);
            var field = this.projectForm.controls[input];
            return field && field.dirty;
        }
    };
    ProjectEditComponent.prototype.minMaxControl = function (min, max) {
        if (min && max) {
            return min > max;
        }
        return min && max;
    };
    ProjectEditComponent.prototype.allNumber = function (input) {
        return input.every(function (element) {
            return !element || typeof element === "number";
        });
    };
    ProjectEditComponent.prototype.disableButton = function () {
        var project = this.project;
        var headline = project.headline;
        var check_size_min = project.target_check_size_min;
        var check_size_max = project.target_check_size_max;
        var revenue_min = project.target_revenue_min;
        var revenue_max = project.target_revenue_max;
        var ebitda_min = project.target_ebitda_min;
        var ebitda_max = project.target_ebitda_max;
        var dirty = [];
        for (var field in project) {
            if (field !== 'headline') {
                dirty.push(project[field]);
            }
        }
        var minMaxFail = this.minMaxControl(check_size_min, check_size_max) || this.minMaxControl(revenue_min, revenue_max) || this.minMaxControl(ebitda_min, ebitda_max);
        if (!headline || headline.length === 0) {
            return true;
        }
        if (minMaxFail) {
            return true;
        }
        if (!this.allNumber(dirty)) {
            return true;
        }
        return false;
    };
    return ProjectEditComponent;
}());
__decorate([
    core_1.ViewChild('projectForm'),
    __metadata("design:type", forms_1.NgForm)
], ProjectEditComponent.prototype, "currentForm", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", project_1.Project)
], ProjectEditComponent.prototype, "project", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], ProjectEditComponent.prototype, "submitted", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], ProjectEditComponent.prototype, "submit", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], ProjectEditComponent.prototype, "update", void 0);
ProjectEditComponent = __decorate([
    core_1.Component({
        selector: 'project-edit',
        templateUrl: './project-edit.component.html',
    }),
    __metadata("design:paramtypes", [project_service_1.ProjectService,
        router_1.Router,
        common_1.Location])
], ProjectEditComponent);
exports.ProjectEditComponent = ProjectEditComponent;
//# sourceMappingURL=project-edit.component.js.map