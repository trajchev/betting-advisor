import { Component, OnInit, Input } from '@angular/core';
import { LeagueService } from '../../league.service';
import { MatSnackBar } from '@angular/material';
import { InfoModalComponent } from 'src/app/user-area/info-modal/info-modal.component';

@Component({
  selector: 'app-league-match',
  templateUrl: './league-match.component.html',
  styleUrls: ['./league-match.component.scss']
})
export class LeagueMatchComponent implements OnInit {

  duration = 4;

  @Input() match;

  constructor(
    private leagueService: LeagueService,
    private _infoModal: MatSnackBar
    ) { }

  ngOnInit() {
  }

  addToTickets(id) {
   this.leagueService.addToTickets(id).subscribe(res => {
    if (res.status === 'success') {
      this._infoModal.openFromComponent(InfoModalComponent, {
        duration: this.duration * 1000,
      });
    }
   });
  }

}
