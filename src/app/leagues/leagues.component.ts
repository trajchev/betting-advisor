import { Component, OnInit } from '@angular/core';

import { LeagueService } from '../service/league.service';

@Component({
  selector: 'app-leagues',
  templateUrl: './leagues.component.html',
  styleUrls: ['./leagues.component.scss']
})
export class LeaguesComponent implements OnInit {

  sports;
  data;

  constructor(private leagueService: LeagueService) { }

  ngOnInit() {
    this.getSports();
  }

  getSports() {
    this.leagueService.getSports().subscribe(res => {
      this.sports = res;
      return this.sports;
    });
  }

}
