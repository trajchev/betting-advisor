import { Component, OnInit, Input } from '@angular/core';
import { Ticket } from './ticket.model';
import { MatSnackBar } from '@angular/material';
import { LeagueService } from '../../leagues/league.service';
import { InfoModalComponent } from '../../info-modal/info-modal.component';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.scss']
})
export class TicketComponent implements OnInit {

  duration = 4;

  @Input() ticket: Ticket;

  constructor(
    private leagueService: LeagueService,
    private _infoModal: MatSnackBar
    ) { }

  ngOnInit() {}

  removeTicket(id) {
    this.leagueService.deleteTicket(id).subscribe(res => {
      this._infoModal.openFromComponent(InfoModalComponent, {
        duration: this.duration * 1000,
      });
    });
  }

}
