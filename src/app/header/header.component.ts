import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  isUserAuthenticated = false;
  private authListenerSubs: Subscription;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    // Check if user is authenticated
    this.isUserAuthenticated = this.authService.getIsAuth();
    this.authListenerSubs = this.authService.getAuthStatusListener().subscribe(isAuthenticated => {
        this.isUserAuthenticated = isAuthenticated;
      }
    );
  }

  onLogout() {
    this.authService.logout();
  }

  ngOnDestroy() {
    // Prevent memory leaks
    this.authListenerSubs.unsubscribe();
  }

}
