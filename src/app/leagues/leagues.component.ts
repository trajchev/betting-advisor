import { Component, OnInit } from '@angular/core';
import { _ } from 'underscore';

import { LeagueService } from '../service/league.service';

@Component({
  selector: 'app-leagues',
  templateUrl: './leagues.component.html',
  styleUrls: ['./leagues.component.scss']
})
export class LeaguesComponent implements OnInit {

  sports;

  constructor(private leagueService: LeagueService) { }

  ngOnInit() {
    this.getSports();
  }

  getSports() {
    this.leagueService.getSports().subscribe(res => {
      this.sports = res;
    });
  }

}
