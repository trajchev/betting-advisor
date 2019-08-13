import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

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

  loginUserForm = new FormGroup({
    userName: new FormControl(''),
    password: new FormControl('')
  });

  constructor(public authService: AuthService) { }

  ngOnInit() {
    this.authStatusSub = this.authService.getAuthStatusListener().subscribe(authStatus => {
      this.isLoading = false;
    });
  }

  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
  }

  onUserLogin() {
    const username = this.loginUserForm.value.userName;
    const password = this.loginUserForm.value.password;
    if (!username || !password) {
      return;
    }
    this.isLoading = true;
    this.authService.login(username, password);

    console.log(this.loginUserForm);
    console.log(`The user ${username} has attempted to login with password ${password}`);
    // this.loginUserForm.reset();
  }

}
