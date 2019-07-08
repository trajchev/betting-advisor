import { Component, OnInit } from '@angular/core';
import { LeagueService } from 'src/app/service/league.service';

@Component({
  selector: 'app-odds',
  templateUrl: './odds.component.html',
  styleUrls: ['./odds.component.scss']
})
export class OddsComponent implements OnInit {

  odds;

  constructor(private leagueService: LeagueService) { }

  ngOnInit() {
    this.odds = this.getOdds('mma_mixed_martial_arts');
  }

  getOdds(league) {
    this.leagueService.getOdds(league).subscribe(res => {
      this.odds = res.data;
      return this.odds;
    });
  }

}
