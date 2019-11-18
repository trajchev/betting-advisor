import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { AuthService } from '../auth.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  isLoading = false;
  private authStatusSub: Subscription;

  private authCredentialsOK = true;

  // create the form using reactive forms
  loginUserForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  });

  constructor(public authService: AuthService) { }

  ngOnInit() {
    this.authStatusSub = this.authService.getAuthStatusListener().subscribe(authStatus => {
      this.isLoading = authStatus;
    });
  }

  onUserLogin() {
    // Get login credentials from login form
    const email = this.loginUserForm.value.email;
    const password = this.loginUserForm.value.password;
    // Stop execution if form is invalid
    if (this.loginUserForm.invalid) {
      return;
    }
    this.isLoading = true;
    this.authService.login(email, password);
    this.authCredentialsOK = this.authService.authCredentialsOK;
    this.loginUserForm.reset();
  }

  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
  }

}
