import { Component, OnInit } from '@angular/core';
import { _ } from 'underscore';

import { LeagueService } from './league.service';

@Component({
  selector: 'app-leagues',
  templateUrl: './leagues.component.html',
  styleUrls: ['./leagues.component.scss']
})
export class LeaguesComponent implements OnInit {

  sports;
  leaguesList = [];

  constructor(private leagueService: LeagueService) { }

  ngOnInit() {
    this.getSports();
  }

  getSports() {
    const lList = [];
    this.leagueService.getSports().subscribe(res => {
      res.data.forEach(league => {
        lList.push(league.group);
      });

      this.leaguesList = _.uniq(lList);
      this.sports = res.data;
    });
  }

  onSelectGroup(selected) {
    if (selected.length === '') {
      this.leagueService.getSports().subscribe(res => {
        this.sports = res.data;
      });
    } else {
      this.leagueService.fetchSportsOfGroup(selected).subscribe(res => {
        this.sports = res.data;
      });
    }
  }

}
