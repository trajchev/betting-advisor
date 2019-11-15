import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { MaterialModule } from './material.module';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './user-area/user/profile.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { TicketsComponent } from './user-area/tickets/tickets.component';
import { LeaguesComponent } from './user-area/leagues/leagues.component';
import { AuthInterceptor } from './auth/auth-interceptor.service';
import { MsToDatePipe } from './pipes/ms-to-date.pipe';
import { MatchComponent } from './user-area/match/match.component';
import { UserAreaComponent } from './user-area/user-area.component';
import { DashboardComponent } from './user-area/dashboard/dashboard.component';
import { UserNavigationComponent } from './user-area/user-navigation/user-navigation.component';
import { TicketComponent } from './user-area/tickets/ticket/ticket.component';
import { LeagueComponent } from './user-area/leagues/league/league.component';
import { LeagueMatchComponent } from './user-area/leagues/league/league-match/league-match.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    DashboardComponent ,
    UserNavigationComponent,
    ProfileComponent,
    LoginComponent,
    RegisterComponent,
    PageNotFoundComponent,
    TicketsComponent,
    TicketComponent ,
    LeaguesComponent,
    MsToDatePipe,
    MatchComponent,
    LeagueComponent ,
    LeagueMatchComponent,
    UserAreaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
