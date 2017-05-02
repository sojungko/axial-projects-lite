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
var project_service_1 = require("./project.service");
var ProjectsComponent = (function () {
    function ProjectsComponent(projectService) {
        this.projectService = projectService;
        this.isSubmitted = true;
    }
    ProjectsComponent.prototype.getProjects = function () {
        var _this = this;
        this.projectService
            .getProjects()
            .then(function (projects) { return _this.projects = projects; });
    };
    ProjectsComponent.prototype.onSelect = function (project) {
        if (this.isSubmitted && (this.selectedProject !== project || this.selectedProject === undefined)) {
            this.isSubmitted = !this.isSubmitted;
        }
        if (this.selectedProject === project) {
            this.isSubmitted = !this.isSubmitted;
        }
        this.selectedProject = project;
    };
    ProjectsComponent.prototype.delete = function (project) {
        var _this = this;
        console.log(project);
        this.projectService.delete(project.id)
            .then(function () {
            _this.projects = _this.projects.filter(function (proj) { return proj.id !== project.id; });
            if (_this.selectedProject && _this.selectedProject.id === project.id) {
                _this.selectedProject = null;
            }
        });
    };
    ProjectsComponent.prototype.handleSubmit = function (event) {
        this.isSubmitted = event;
    };
    ProjectsComponent.prototype.ngOnInit = function () {
        this.getProjects();
    };
    return ProjectsComponent;
}());
ProjectsComponent = __decorate([
    core_1.Component({
        selector: 'projects',
        template: "\n  <div class=\"projects-container\">\n    <div class=\"projects\">\n      <ul *ngFor=\"let project of projects\" class=\"list-group\">\n        <li class=\"list-group-item\">ID: {{project.id}}</li>\n        <li class=\"list-group-item\">Headline: {{project.headline}}</li>\n        <li class=\"list-group-item\">Target Check Size Minimum: {{project.target_check_size_min | commaSeparatedNumber }}</li>\n        <li class=\"list-group-item\">Target Check Size Maximum: {{project.target_check_size_max | commaSeparatedNumber}}</li>\n        <li class=\"list-group-item\">Target Revenue Minimum: {{project.target_revenue_min | commaSeparatedNumber}}</li>\n        <li class=\"list-group-item\">Target Revenue Maximum: {{project.target_revenue_max | commaSeparatedNumber}}</li>\n        <li class=\"list-group-item\">Target EBITDA Minimum: {{project.target_ebitda_min | commaSeparatedNumber}}</li>\n        <li class=\"list-group-item\">Target EBITDA Maximum: {{project.target_ebitda_max | commaSeparatedNumber}}</li>\n        <button (click)=\"onSelect(project)\" class=\"btn btn-primary\" >Edit</button>\n        <button (click)=\"delete(project); $event.stopPropagation()\" class=\"btn btn-primary\">Delete</button>\n    </ul>\n    </div>\n    <div class=\"projects-edit\">\n      <project-edit\n        [project]=\"selectedProject\"\n        [submitted]=\"isSubmitted\"\n        (submit)=\"handleSubmit($event)\"\n      >\n      </project-edit>\n    </div>\n  </div>\n  ",
    }),
    __metadata("design:paramtypes", [project_service_1.ProjectService])
], ProjectsComponent);
exports.ProjectsComponent = ProjectsComponent;
//# sourceMappingURL=projects.component.js.map