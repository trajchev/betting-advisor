import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerUserForm = new FormGroup({
    userName: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl('')
  });

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  onUserRegister() {

    if (this.registerUserForm.invalid) {
      return;
    }

    const username = this.registerUserForm.value.userName;
    const email = this.registerUserForm.value.email;
    const password = this.registerUserForm.value.password;
    this.authService.createUser(username, email, password);

    console.log(`User ${username} with email: ${email}, has requested to signup with password ${password}`);
    this.registerUserForm.reset();
  }

}
