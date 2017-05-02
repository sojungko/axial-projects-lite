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
    return ProjectEditComponent;
}());
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