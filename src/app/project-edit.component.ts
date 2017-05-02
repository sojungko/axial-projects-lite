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
    return !(/[^0-9,.]/g).test(input);
  }

  isDirty(input: any) {
    if (this.projectForm) {
      const field = this.projectForm.controls[input];
      return field && field.dirty;
    }
  }

  minMaxControl(min: any, max: any) {
    if (min && max) {
      return min > max;
    }
    return min && max;
  }

  allNumber(input: Array<any>) {
    return input.every((element: any) => {
      return this.isNumber(element);
    });
  }

  disableButton() {
    const project = this.project;
    const headline = project.headline;
    const check_size_min = project.target_check_size_min;
    const check_size_max = project.target_check_size_max;
    const revenue_min = project.target_revenue_min;
    const revenue_max = project.target_revenue_max;
    const ebitda_min = project.target_ebitda_min;
    const ebitda_max = project.target_ebitda_max;
    let dirty = [];
    for (let field in project) {
      if (field !== 'headline') {
        dirty.push(project[field]);
      }
    }
    const minMaxFail = this.minMaxControl(check_size_min, check_size_max) || this.minMaxControl(revenue_min, revenue_max) || this.minMaxControl(ebitda_min, ebitda_max);
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
  }  

}