import { Component, OnInit } from '@angular/core';
import { UserService } from '../user/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  userData;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.getDashboardData();
  }

  getDashboardData() {
    this.userService.fetchDashboardData().subscribe(res => {
      this.userData = res;
    });
  }

}
