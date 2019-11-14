import { Component, OnInit } from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {MatIconRegistry} from '@angular/material/icon';

@Component({
  selector: 'app-dashboard-navigation',
  templateUrl: './dashboard-navigation.component.html',
  styleUrls: ['./dashboard-navigation.component.scss']
})
export class DashboardNavigationComponent implements OnInit {

  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    iconRegistry.addSvgIcon(
      'dashboard',
      sanitizer.bypassSecurityTrustResourceUrl('assets/images/icons/dashboard.svg'));
    iconRegistry.addSvgIcon(
      'account-circle',
      sanitizer.bypassSecurityTrustResourceUrl('assets/images/icons/account_circle.svg'));
    iconRegistry.addSvgIcon(
      'tickets',
      sanitizer.bypassSecurityTrustResourceUrl('assets/images/icons/layers.svg'));
    iconRegistry.addSvgIcon(
      'list',
      sanitizer.bypassSecurityTrustResourceUrl('assets/images/icons/view_list.svg'));
  }

  ngOnInit() {
  }

}
