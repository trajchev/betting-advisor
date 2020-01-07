import { Component, OnInit, OnDestroy } from '@angular/core';
import { LeagueService } from '../leagues/league.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-match',
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.scss']
})
export class MatchComponent implements OnInit, OnDestroy {

  matchData;
  oddType = 'h2h';

  constructor(private leagueService: LeagueService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.getMatch();
  }

  getMatch() {
    const sportKey = this.route.snapshot.params['league'];
    const id = this.route.snapshot.params['matchId'];
    return this.leagueService.fetchMatch(sportKey, id, this.oddType).subscribe(res => {
      this.matchData = res.data;
    });
  }

  setOddType(type: string) {
    this.oddType = type;
    this.getMatch();
  }

  ngOnDestroy() {
    this.getMatch().unsubscribe();
  }

}
