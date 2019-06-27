import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  user = {
    firstName: 'Ivan',
    lastName: 'Trajchev',
    username: 'Ivanche',
    email: 'ivan@yahoo.com',
    password: '***',
    joined: new Date().getFullYear()
  };

  constructor() { }

  getUser() {
    return this.user;
  }
}
