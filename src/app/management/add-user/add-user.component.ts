import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ManagementService} from '../management.service';
import {UserCreate} from '../management-models';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  addUserForm: FormGroup;
  success: boolean;
  error: boolean;

  constructor(private fb: FormBuilder, private managementService: ManagementService) {
    this.createForm();
  }

  ngOnInit() {
  }

  createForm() {
    this.addUserForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(30)]],
      role: ['janitor', [Validators.required]],
    });
  }

  addUser() {
    const user: UserCreate = {
      name: this.addUserForm.value.name,
      password: this.addUserForm.value.password,
      role: this.addUserForm.value.role,
    };
    this.managementService.createUser(user).subscribe(
      _ => {
        this.success = true;
        this.error = false;
      },
      error => {
        this.error = true;
        this.success = false;
      }
    );
  }

}
