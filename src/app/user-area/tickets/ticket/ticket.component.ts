import { Component, OnInit, Input } from '@angular/core';
import { Ticket } from './ticket.model';
import { LeagueService } from 'src/app/user-area/leagues/league.service';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.scss']
})
export class TicketComponent implements OnInit {

  @Input() ticket: Ticket;

  constructor(private leagueService: LeagueService) { }

  ngOnInit() {}

  getMatch(sportKey, id) {
    this.leagueService.fetchMatch(sportKey, id).subscribe(res => {
      console.log(res);
    });
  }

  removeTicket(id) {
    this.leagueService.deleteTicket(id).subscribe(res => {
      if (res.status === 'success') {
        console.log(res);
      }
    });
  }

}
