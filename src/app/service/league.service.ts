import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { environment } from '../../environments/environment';

const BACKEND = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class LeagueService {

  apiURL = 'https://api.the-odds-api.com/v3';
  // private tickets: Ticket[] = [];
  private leagues = [];

  constructor(private http: HttpClient) { }

  getLeagues(): Observable<any> {
    return this.http
      .get(`${this.apiURL}/sports/?apiKey=${environment.apiKey}`)
      .pipe(
        catchError(error => {
          return [];
        })
      );
  }

  getSports(): Observable<any> {
    return this.http
      .get(`${BACKEND}/leagues`)
      .pipe(
        catchError(error => {
          return [];
        })
      );
  }

  getLeague(sport): Observable<any> {
    return this.http
      .get(`${this.apiURL}/odds/?sport=${sport}&region=uk&apiKey=${environment.apiKey}`)
      .pipe(
        catchError(error => {
          return [];
        })
      );
  }

  getOdds(sport): Observable<any> {
    return this.http
      .get(`${this.apiURL}/odds/?sport=${sport}&region=uk&apiKey=${environment.apiKey}`)
      .pipe(
        catchError(error => {
          return [];
        })
      );
  }

  // Error handler
  handleError(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }
}
