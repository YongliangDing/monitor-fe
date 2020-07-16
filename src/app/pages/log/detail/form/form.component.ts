import { Component, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ILogForm } from 'src/app/interface';

@Component({
  selector: "app-form",
  templateUrl: "./form.component.html",
  styleUrls: ["./form.component.css"],
})
export class FormComponent {
  validateForm!: FormGroup;
  @Output() submit = new EventEmitter<ILogForm>();

  constructor(private fb: FormBuilder) {
    this.validateForm = this.fb.group({
      ipAddress: [
        '',
        [
          Validators.pattern(
            /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/
          ),
        ],
      ],
      requestMethod: [''],
      protocol: [''],
      requestState: [''],
      os: [''],
      browser: [''],
    });
  }

  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    event.stopPropagation();
    this.submit.emit(this.validateForm.value);
  }

  resetForm(e: MouseEvent): void {
    e.preventDefault();
    this.validateForm.reset();
    for (const key in this.validateForm.controls) {
      this.validateForm.controls[key].markAsPristine();
      this.validateForm.controls[key].updateValueAndValidity();
    }
    this.submit.emit(this.validateForm.value);
  }
}
