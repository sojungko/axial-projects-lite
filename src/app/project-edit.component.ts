import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { ProjectService } from './project.service';
import { Project } from './project';

@Component({
  selector: 'project-edit',
  templateUrl: './project-edit.component.html',
})

export class ProjectEditComponent {
  constructor(
    private projectService: ProjectService,
    private router: Router,
    private location: Location
  ) { }

  projectForm: NgForm;
  
  @Input() project: Project;
  @Input() submitted: boolean;
  @Output() submit = new EventEmitter();
  @Output() update = new EventEmitter();

  onSubmit(projectForm: NgForm): void {
    this.submitted = !this.submitted;
    console.log(projectForm.value);
    const submitting = { ...projectForm.value, id: this.project.id }
    this.projectService.update(submitting)
      .then((project) => {
        this.submit.emit(true);
      });
  }

  isNumber(input: any) {
    return typeof input === "number";
  }

  isDirty(input: any) {
    if (this.projectForm) {
      const field = this.projectForm.controls[input];
      return field.dirty;
    }
  }
  
}