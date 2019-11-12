import { Component, OnInit } from '@angular/core';

import { TicketsService } from '../service/tickets.service';
import { UserService } from '../service/user.service';
import { AuthService } from '../auth/auth.service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  tickets;
  user;

  constructor(
    public ticketService: TicketsService,
    public authService: AuthService ,
    public userService: UserService) { }

  ngOnInit() {
    // this.showTickets();
    this.user = this.userService.getActiveUser().subscribe(res => {
      this.user = res.data;
    });
  }

  showTickets() {
    return this.ticketService.getTickets()
      .subscribe((data) => {
        this.tickets = data;
      });
  }
}
