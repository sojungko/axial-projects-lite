import { Component, Input, Output, EventEmitter, ViewChild } from '@angular/core';
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

  @ViewChild('projectForm') currentForm: NgForm;  
  
  @Input() project: Project;
  @Input() submitted: boolean;
  @Output() submit = new EventEmitter();
  @Output() update = new EventEmitter();

  formErrors = {
    'headline': '',
    'target_check_size_min': '',
    'target_check_size_max': '',
    'target_revenue_min': '',
    'target_revenue_max': '',
    'target_ebitda_min': '',
    'target_ebitda_max': '',
  };

  validationMessages = {
    'headline': {
      'required': 'Required'
    },
  };    
  
  onSubmit(projectForm: NgForm): void {
    this.submitted = !this.submitted;
    console.log(projectForm.value);
    const submitting = { ...projectForm.value, id: this.project.id }
    this.projectService.update(submitting)
      .then((project) => {
        this.submit.emit(true);
      });
  }

  ngAfterViewChecked() {
    this.formChanged();
  }

  formChanged() {
    if (this.currentForm === this.projectForm) { return; }
    this.projectForm = this.currentForm;
    if (this.projectForm) {
      this.projectForm.valueChanges
        .subscribe(data => this.onValueChanged(data));
    }
  }

  onValueChanged(data?: any) {
    if (!this.projectForm) { return; }
    const form = this.projectForm.form;

    for (const field in this.formErrors) {
      // clear previous error message (if any)
      this.formErrors[field] = '';
      const control = form.get(field);

      if (control && control.dirty && !control.valid) {
        const messages = this.validationMessages[field];
        for (const key in control.errors) {
          this.formErrors[field] += messages[key] + ' ';
        }
      }
    }
  }
  
  isNumber(input: any) {
    console.log(typeof input);
    return typeof input === "number";
  }

  isDirty(input: any) {
    console.log(this.projectForm.controls);
    if (this.projectForm) {
      const field = this.projectForm.controls[input];
      return field.dirty;
    }
  }
  
}