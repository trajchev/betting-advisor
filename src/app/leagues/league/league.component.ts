import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { LeagueService } from 'src/app/service/league.service';
import { MatchService } from 'src/app/service/match.service';

@Component({
  selector: 'app-league',
  templateUrl: './league.component.html',
  styleUrls: ['./league.component.scss']
})
export class LeagueComponent implements OnInit {

  league;
  games;
  matches;

  constructor(
    private leagueService: LeagueService,
    private route: ActivatedRoute,
    private matchService: MatchService) { }

  ngOnInit() {
    this.getMatches();
  }

  getLeague(league) {
    this.leagueService.getLeague(league).subscribe(res => {
      this.games = res.data;
      return this.games;
    });
  }

  getMatches() {
    this.matchService.getMatches('tennis_wta_us_open').subscribe(res => {
      this.matches = res.matches;
    });
  }
}
