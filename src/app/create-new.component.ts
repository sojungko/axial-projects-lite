import { Component, Input, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

import { ProjectService } from './project.service';
import { Project } from './project';

@Component({
  selector: 'create-new',
  templateUrl: './create-new.component.html'
})

export class CreateNewComponent { 
  project: Project;
  projectForm: NgForm;

  formErrors = {
    'target_check_size_min': '',
    'target_check_size_max': '',
    'target_revenue_min': '',
    'target_revenue_max': '',
    'target_ebitda_min': '',
    'target_ebitda_max': '',
  };

  validationMessages = {
    'target_check_size_min': {
      'max': 'Cannot exceed maximum',
      'required': 'Required'
    },
  };  

  @ViewChild('projectForm') currentForm: NgForm;

  constructor(
    private projectService: ProjectService,
    private router: Router,
  ) { }
  
  ngAfterViewChecked() {
    this.formChanged();
  }

  formChanged() {
    if (this.currentForm === this.projectForm) { return; }
    console.log('this.currentForm : ', this.currentForm);
    console.log('this.projectForm: ', this.projectForm);
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
  
  onSubmit(projectForm: NgForm): void {
    console.log(projectForm.value);
    this.projectService.create(projectForm.value)
      .then(() => this.goBack())
  }

  goBack(): void {
    this.router.navigate(['/projects'])
  }
}