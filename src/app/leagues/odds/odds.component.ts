import { Component, OnInit } from '@angular/core';
import { LeagueService } from 'src/app/service/league.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-odds',
  templateUrl: './odds.component.html',
  styleUrls: ['./odds.component.scss']
})
export class OddsComponent implements OnInit {

  odds;
  sport;

  constructor(private leagueService: LeagueService, private route: ActivatedRoute) { }

  ngOnInit() {
    // this.sport = this.route.snapshot.paramMap.get('sport');
    // this.odds = this.getOdds(this.sport);
  }

  getOdds(league) {
    this.leagueService.getOdds(league).subscribe(res => {
      this.odds = res.data;
      return this.odds;
    });
  }

}
