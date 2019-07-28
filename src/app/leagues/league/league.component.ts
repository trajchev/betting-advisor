import { Component, OnInit } from '@angular/core';
import { LeagueService } from 'src/app/service/league.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-league',
  templateUrl: './league.component.html',
  styleUrls: ['./league.component.scss']
})
export class LeagueComponent implements OnInit {

  league;
  games;

  constructor(private leagueService: LeagueService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.league = this.route.snapshot.paramMap.get('league');
    this.games = this.getLeague(this.league);
  }

  getLeague(league) {
    this.leagueService.getLeague(league).subscribe(res => {
      this.games = res.data;
      // console.log(this.games);
      return this.games;
    });
  }
}
