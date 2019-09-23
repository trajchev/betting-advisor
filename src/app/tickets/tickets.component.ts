import { Component, OnInit } from '@angular/core';
import { TicketsService } from '../service/tickets.service';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.scss']
})
export class TicketsComponent implements OnInit {

  tickets;

  constructor(public ticketService: TicketsService) { }

  ngOnInit() {
    // this.showTickets();
  }

  // Retrieve tickets from service
  // showTickets() {
  //   return this.ticketService.getTickets()
  //     .subscribe(data => {
  //       this.tickets = data;
  //     });
  // }

}
