import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LeagueService } from '../league.service';

@Component({
  selector: 'app-league',
  templateUrl: './league.component.html',
  styleUrls: ['./league.component.scss']
})
export class LeagueComponent implements OnInit {

  matches;

  constructor(private route: ActivatedRoute, private leagueService: LeagueService) { }

  ngOnInit() {
    this.getMatches();
  }

  getMatches() {
    const sportKey = this.route.snapshot.params['league'];
    this.leagueService.fetchMatches(sportKey).subscribe(res => {
      this.matches = res.data;
    });
  }

}
