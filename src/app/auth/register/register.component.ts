import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  isLoading = false;
  // Create user registration form using reactive forms
  registerUserForm = new FormGroup({
    userName: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl('')
  });

  constructor(public authService: AuthService) { }

  ngOnInit() {
    this.isLoading = false;
  }

  onUserRegister() {
    this.isLoading = true;
    // Stop code execution if entered data is invalid
    if (this.registerUserForm.invalid) {
      return;
    }
    // Retrieve user registration data from registration form
    const username = this.registerUserForm.value.userName;
    const email = this.registerUserForm.value.email;
    const password = this.registerUserForm.value.password;

    // Register user and clear form input fields
    this.authService.createUser(username, email, password);
    this.isLoading = false;
    this.registerUserForm.reset();
  }

}
