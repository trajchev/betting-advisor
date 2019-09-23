import { Component, OnInit, Inject } from '@angular/core';

import { TicketsService } from '../service/tickets.service';
import { UserService } from '../service/user.service';
import { User } from './profile.model';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  tickets;
  user: User;

  constructor(
    public ticketService: TicketsService,
    public authService: AuthService ,
    public userService: UserService) { }

  ngOnInit() {
    // this.showTickets();
    // this.user = this.authService.getUserId().subscribe(res => {
    //   console.log(res);
    // });
    // this.showUser();
  }

  showTickets() {
    return this.ticketService.getTickets()
      .subscribe((data) => {
        this.tickets = data;
      });
  }

  showUser() {
    return this.userService.getUsers()
      .subscribe((data) => {
        console.log(data);
        this.user = data[0];
      });
  }

}
