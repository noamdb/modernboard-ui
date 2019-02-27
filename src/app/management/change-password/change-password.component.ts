import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators} from '@angular/forms';
import {ManagementService} from '../management.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  changePasswordForm: FormGroup;
  success: boolean;
  error: boolean;

  constructor(private fb: FormBuilder, private managementService: ManagementService) {
    this.createForm();
  }

  ngOnInit() {
  }


  createForm() {
    this.changePasswordForm = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(30)]],
      newPassword: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(30)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(30)]],
    }, {
      validator: matchValidator('newPassword', 'confirmPassword')
    });
  }


  changePassword() {
    this.managementService.changePassword(this.changePasswordForm.value.password,
      this.changePasswordForm.value.newPassword).subscribe(
      _ => {
        this.success = true;
        this.error = false;
      }, _ => {
        this.error = true;
        this.success = false;
      }
    )
    ;
  }
}


export const matchValidator = (first, second): ValidatorFn => (control: AbstractControl) => {
  return (control.get(second).value && control.get(first).value) === control.get(second).value ? null : {'mismatch': true};
};
