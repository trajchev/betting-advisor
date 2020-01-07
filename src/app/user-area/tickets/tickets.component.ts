import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material';

import { UserService } from '../user/user.service';
import { UserTicket } from './ticket/userSavedTicket.model';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.scss']
})
export class TicketsComponent implements OnInit {

  tickets: UserTicket[] = [];
  isLoading = false;
  // Mat paginator input
  totalTickets = 0;
  ticketsPerPage = 10;
  currentPage = 1;
  pageSizeOptions = [10, 25, 50, 100];

  constructor(public userService: UserService) { }

  ngOnInit() {
    this.getTickets();
  }

  // Retrieve data using the service
  getTickets() {
    this.userService.fetchUserTickets(this.ticketsPerPage, this.currentPage).subscribe(res => {
      this.totalTickets = res.stats.records;
      this.tickets = res.data;
    });
  }

  onChangedPage(pageData: PageEvent) {
    this.isLoading = true;
    this.currentPage = pageData.pageIndex + 1;
    this.ticketsPerPage = pageData.pageSize;
    this.userService.fetchUserTickets(this.ticketsPerPage, this.currentPage).subscribe(res => {
      this.tickets = res.data;
      this.isLoading = false;
    });
  }

}
