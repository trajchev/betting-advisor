import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './user-area/user/profile.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { TicketsComponent } from './user-area/tickets/tickets.component';
import { LeaguesComponent } from './user-area/leagues/leagues.component';
import { AuthGuard } from './auth/auth.guard';
import { MatchComponent } from './user-area/match/match.component';
import { DashboardComponent } from './user-area/dashboard/dashboard.component';
import { LeagueComponent } from './user-area/leagues/league/league.component';
import { UserAreaComponent } from './user-area/user-area.component';

const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'user', component: UserAreaComponent, canActivate: [AuthGuard], children: [
    { path: 'dashboard', component: DashboardComponent},
    { path: 'profile', component: ProfileComponent},
    { path: 'tickets', component: TicketsComponent},
    { path: 'leagues', component: LeaguesComponent},
    { path: 'leagues/:league', component: LeagueComponent},
    { path: 'matches/:league/:matchId', component: MatchComponent},
  ]},
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
