import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard-navigation',
  templateUrl: './dashboard-navigation.component.html',
  styleUrls: ['./dashboard-navigation.component.scss']
})
export class DashboardNavigationComponent implements OnInit {

  showSidebar = false;

  constructor() { }

  ngOnInit() {
  }

  onOpen() {
    this.showSidebar = true;
  }

  onClose() {
    this.showSidebar = false;
  }

}
