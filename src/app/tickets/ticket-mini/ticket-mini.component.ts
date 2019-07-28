import { Component, OnInit, Input } from '@angular/core';
import { Ticket } from '../ticket/ticket.model';

@Component({
  selector: 'app-ticket-mini',
  templateUrl: './ticket-mini.component.html',
  styleUrls: ['./ticket-mini.component.scss']
})
export class TicketMiniComponent implements OnInit {

  @Input() ticket: Ticket;

  constructor() { }

  ngOnInit() {
  }

}
