import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { TicketsComponent } from './tickets/tickets.component';
import { TicketComponent } from './tickets/ticket/ticket.component';
import { LeaguesComponent } from './leagues/leagues.component';
import { OddsComponent } from './leagues/odds/odds.component';
import { LeagueComponent } from './leagues/league/league.component';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]  },
  { path: 'tickets', component: TicketsComponent, canActivate: [AuthGuard]  },
  { path: 'ticket', component: TicketComponent, canActivate: [AuthGuard]  },
  { path: 'league/:league', component: LeagueComponent, canActivate: [AuthGuard]  },
  { path: 'leagues', component: LeaguesComponent, canActivate: [AuthGuard]  },
  { path: 'odds/:sport', component: OddsComponent, canActivate: [AuthGuard]  },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
