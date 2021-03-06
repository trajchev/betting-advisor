import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { AuthService } from '../auth.service';
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  private hide = true;
  private hideConfirm = true;
  isLoading = false;
  // Create user registration form using reactive forms
  registerUserForm = new FormGroup({
    userName: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    passwordConfirm: new FormControl('')
  });

  constructor(public authService: AuthService, iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) { 

    iconRegistry.addSvgIcon(
      'visibility',
      sanitizer.bypassSecurityTrustResourceUrl('assets/images/icons/visibility.svg'));
  }

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
    const passwordConfirm = this.registerUserForm.value.passwordConfirm;

    // Register user and clear form input fields
    this.authService.signup(username, email, password, passwordConfirm);
    this.registerUserForm.reset();
    this.isLoading = false;
  }

}
