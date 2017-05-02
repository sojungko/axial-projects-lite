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
    'headline': '',
  };

  validationMessages = {
    'headline': {
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
      return field.dirty;
    }
  }

  minMaxControl(min: any, max: any) {
    if (min.value && max.value) {
      return min.value > max.value;
    }
    return min.value && (max.pristine || !max.value) || max.value && (min.pristine || !min.value);
  }

  allNumber(input: Array<any>) {
    return input.every((element: any) => {
      return !element.value || typeof element.value === "number"
    });
  }

  disableButton() {
    if (this.projectForm) {
      const form = this.projectForm.form.controls;
      const headline = form.headline;
      const check_size_min = form.target_check_size_min;
      const check_size_max = form.target_check_size_max;
      const revenue_min = form.target_revenue_min;
      const revenue_max = form.target_revenue_max;
      const ebitda_min = form.target_ebitda_min;
      const ebitda_max = form.target_ebitda_max;
      let dirty = [];
      for (let field in form) {
        if (field !== 'headline') {
          dirty.push(form[field]);
        }
      }
      const headlineInvalid = !headline.value || headline.value.length === 0;
      const minMaxFail = this.minMaxControl(check_size_min, check_size_max) || this.minMaxControl(revenue_min, revenue_max) || this.minMaxControl(ebitda_min, ebitda_max);
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
  }

  onSubmit(projectForm: NgForm): void {
    this.projectService.create(projectForm.value)
      .then(() => this.goBack())
  }

  goBack(): void {
    this.router.navigate(['/projects'])
  }
}
