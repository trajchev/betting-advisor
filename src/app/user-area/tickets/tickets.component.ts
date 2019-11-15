import { Component, OnInit } from '@angular/core';
import { UserService } from '../user/user.service';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.scss']
})
export class TicketsComponent implements OnInit {

  tickets;

  constructor(public userService: UserService) { }

  ngOnInit() {
    this.getTickets();
  }

  // Retrieve data using the service
  getTickets() {
    this.userService.fetchUserTickets().subscribe(res => {
      this.tickets = res.data;
    });
  }

}
