import { Component, OnInit } from '@angular/core';
import { LeagueService } from '../leagues/league.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-match',
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.scss']
})
export class MatchComponent implements OnInit {

  matchData;

  constructor(private leagueService: LeagueService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.getMatch();
  }

  getMatch() {
    const sportKey = this.route.snapshot.params['league'];
    const id = this.route.snapshot.params['matchId'];
    this.leagueService.fetchMatch(sportKey, id).subscribe(res => {
      this.matchData = res.data;
    });
  }

}
