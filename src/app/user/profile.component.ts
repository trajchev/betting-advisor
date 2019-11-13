import { Component, OnInit } from '@angular/core';

import { UserService } from './user.service';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  tickets;
  user;

  constructor(
    public authService: AuthService ,
    public userService: UserService) { }

  ngOnInit() {
    // this.showTickets();
    this.user = this.userService.getActiveUser().subscribe(res => {
      this.user = res.data;
    });
  }
}
