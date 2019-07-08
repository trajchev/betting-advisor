import { Component, OnInit } from '@angular/core';
import { TicketsService } from '../service/tickets.service';
import { UserService } from '../service/user.service';
import { User } from './profile.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  tickets;
  user: User;

  constructor(public ticketService: TicketsService, public userService: UserService) { }

  ngOnInit() {
    this.showTickets();
    this.user = this.userService.user;
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
        this.user = data[0];
      });
  }

}
