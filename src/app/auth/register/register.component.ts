import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

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

  constructor() { }

  ngOnInit() {
  }

  onUserRegister() {
    const username = this.registerUserForm.value.userName;
    const email = this.registerUserForm.value.email;
    const password = this.registerUserForm.value.password;

    console.log(`User ${username} with email: ${email}, has requested to signup with password ${password}`);
    this.registerUserForm.reset();
  }

}
