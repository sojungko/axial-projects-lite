import { Component, OnInit } from '@angular/core';
import { ProjectService } from './project.service';
import { Project } from './project';

@Component({
  selector: 'projects',
  template: `
  <div class="projects-container">
    <div class="projects">
      <ul *ngFor="let project of projects" class="list-group">
        <li class="list-group-item">ID: {{project.id}}</li>
        <li class="list-group-item">Headline: {{project.headline}}</li>
        <li class="list-group-item">Target Check Size Minimum: {{project.target_check_size_min | commaSeparatedNumber }}</li>
        <li class="list-group-item">Target Check Size Maximum: {{project.target_check_size_max | commaSeparatedNumber}}</li>
        <li class="list-group-item">Target Revenue Minimum: {{project.target_revenue_min | commaSeparatedNumber}}</li>
        <li class="list-group-item">Target Revenue Maximum: {{project.target_revenue_max | commaSeparatedNumber}}</li>
        <li class="list-group-item">Target EBITDA Minimum: {{project.target_ebitda_min | commaSeparatedNumber}}</li>
        <li class="list-group-item">Target EBITDA Maximum: {{project.target_ebitda_max | commaSeparatedNumber}}</li>
        <button (click)="onSelect(project)" class="btn btn-primary" >Edit</button>
        <button (click)="delete(project); $event.stopPropagation()" class="btn btn-primary">Delete</button>
    </ul>
    </div>
    <div class="projects-edit">
      <project-edit
        [project]="selectedProject"
        [submitted]="isSubmitted"
        (submit)="handleSubmit($event)"
      >
      </project-edit>
    </div>
  </div>
  `,
})

export class ProjectsComponent implements OnInit{
  projects: Project[];
  selectedProject: Project;
  isSubmitted: boolean = true;

  constructor(private projectService: ProjectService) { }
  
  getProjects(): void {
    this.projectService
      .getProjects()
      .then(projects => this.projects = projects);
  }

  onSelect(project: Project): void {
    if (this.isSubmitted && (this.selectedProject !== project || this.selectedProject === undefined)) {
      this.isSubmitted = !this.isSubmitted;
    }
    if (this.selectedProject === project) {
      this.isSubmitted = !this.isSubmitted;
    }
    this.selectedProject = project;
  }
  
  delete(project: Project): void {
    console.log(project);
    this.projectService.delete(project.id)
      .then(() => {
        this.projects = this.projects.filter(proj => proj.id !== project.id);
        if (this.selectedProject && this.selectedProject.id === project.id) { this.selectedProject = null; }
      })
  }

  handleSubmit(event: boolean): void {
    this.isSubmitted = event;
  }

  ngOnInit(): void {
    this.getProjects();
  }
}