import { Component, OnInit, Input } from '@angular/core';
import { LeagueService } from '../../league.service';

@Component({
  selector: 'app-league-match',
  templateUrl: './league-match.component.html',
  styleUrls: ['./league-match.component.scss']
})
export class LeagueMatchComponent implements OnInit {

  @Input() match;

  constructor(private leagueService: LeagueService) { }

  ngOnInit() {
  }

  addToTickets(id) {
  //  this.leagueService.addToTickets(id);
  }

}
