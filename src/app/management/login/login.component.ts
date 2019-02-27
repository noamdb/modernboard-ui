import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ManagementService} from '../management.service';
import {Router} from '@angular/router';
import {UserLogin} from '../management-models';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  error: boolean;

  constructor(private fb: FormBuilder, private managementervice: ManagementService,
              private router: Router) {
    this.createForm();
  }

  ngOnInit() {
  }

  createForm() {
    this.loginForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      password: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(30)]],
    });
  }

  login() {
    const user: UserLogin = {
      name: this.loginForm.value.name,
      password: this.loginForm.value.password,
    };
    this.managementervice.login(user).subscribe(
      _ => this.router.navigate([`/management`]),
      _ => this.error = true
    );
  }
}
