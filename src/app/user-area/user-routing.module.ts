import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserAreaComponent } from './user-area.component';
import { AuthGuard } from '../auth/auth.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './user/profile.component';
import { TicketsComponent } from './tickets/tickets.component';
import { LeaguesComponent } from './leagues/leagues.component';
import { LeagueComponent } from './leagues/league/league.component';
import { MatchComponent } from './match/match.component';

const childRoutes: Routes = [
    { path: 'user', component: UserAreaComponent, canActivate: [AuthGuard], children: [
        { path: 'dashboard', component: DashboardComponent},
        { path: 'profile', component: ProfileComponent},
        { path: 'tickets', component: TicketsComponent},
        { path: 'leagues', component: LeaguesComponent},
        { path: 'leagues/:league', component: LeagueComponent},
        { path: 'matches/:league/:matchId', component: MatchComponent},
    ]},
];

@NgModule({
    imports: [
        RouterModule.forChild(childRoutes)
    ],
    exports: [RouterModule],
    providers: [AuthGuard]
})
export class UserRoutingModule {}
