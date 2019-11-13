import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { MaterialModule } from './material.module';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DashboardNavigationComponent } from './dashboard/dashboard-navigation/dashboard-navigation.component';
import { ProfileComponent } from './user/profile.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { TicketsComponent } from './tickets/tickets.component';
import { TicketComponent } from './tickets/ticket/ticket.component';
import { LeaguesComponent } from './leagues/leagues.component';
import { AuthInterceptor } from './auth/auth-interceptor.service';
import { MsToDatePipe } from './pipes/ms-to-date.pipe';
import { MatchComponent } from './match/match.component';
import { LeagueComponent } from './leagues/league/league.component';
import { LeagueMatchComponent } from './leagues/league/league-match/league-match.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    DashboardComponent,
    DashboardNavigationComponent,
    ProfileComponent,
    LoginComponent,
    RegisterComponent,
    PageNotFoundComponent,
    TicketsComponent,
    TicketComponent,
    LeaguesComponent,
    MsToDatePipe,
    MatchComponent,
    LeagueComponent,
    LeagueMatchComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
