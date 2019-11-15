import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { MaterialModule } from '../material.module';

import { UserAreaComponent } from './user-area.component';
import { UserNavigationComponent } from './user-navigation/user-navigation.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './user/profile.component';
import { LeaguesComponent } from './leagues/leagues.component';
import { LeagueComponent } from './leagues/league/league.component';
import { LeagueMatchComponent } from './leagues/league/league-match/league-match.component';
import { TicketsComponent } from './tickets/tickets.component';
import { TicketComponent } from './tickets/ticket/ticket.component';
import { MatchComponent } from './match/match.component';
import { AppRoutingModule } from '../app-routing.module';
import { AuthInterceptor } from '../auth/auth-interceptor.service';
import { MsToDatePipe } from '../pipes/ms-to-date.pipe';
import { UserRoutingModule } from './user-routing.module';

@NgModule({
    declarations: [
        UserAreaComponent,
        UserNavigationComponent,
        DashboardComponent,
        ProfileComponent,
        LeaguesComponent,
        LeagueComponent,
        LeagueMatchComponent,
        TicketsComponent,
        TicketComponent,
        MatchComponent,
        MsToDatePipe
    ],
    imports: [
        UserRoutingModule,
        CommonModule,
        MaterialModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
    ],
    exports: [
        UserAreaComponent,
        UserNavigationComponent,
        DashboardComponent,
        ProfileComponent,
        LeaguesComponent,
        LeagueComponent,
        LeagueMatchComponent,
        TicketsComponent,
        TicketComponent,
        MatchComponent,
    ]
})
export class UserModule { }
