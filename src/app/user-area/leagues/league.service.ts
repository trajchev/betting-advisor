import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { environment } from '../../../environments/environment';
import { SavedGame } from './league/league-match/saved-match.model';

@Injectable({
  providedIn: 'root'
})
export class LeagueService {

  constructor(private http: HttpClient) { }

  getSports(): Observable<any> {
    return this.http
      .get(`${environment.apiUrl}/leagues`)
      .pipe(
        catchError(error => {
          return [];
        })
      );
  }

  fetchSportsOfGroup(group: string): Observable<any> {
    return this.http
      .get(`${environment.apiUrl}/leagues/${group}`)
      .pipe(
        catchError(error => {
          return [];
        })
      );
  }

  fetchMatches(sportKey: string): Observable<any> {
    return this.http
      .get(`${environment.apiUrl}/matches/${sportKey}`)
      .pipe(
        catchError(error => {
          return [];
        })
      );
  }

  fetchMatch(sportKey: string, id: number): Observable<any> {
    return this.http
      .get(`${environment.apiUrl}/matches/${sportKey}/${id}`)
      .pipe(
        catchError(error => {
          return [];
        })
      );
  }

  addToTickets(matchId: number) {
    const match = {matchId: matchId};
    return this.http.post<SavedGame>(`${environment.apiUrl}/matches/`, match);
  }

  deleteTicket(ticketId: number) {
    return this.http.delete(`${environment.apiUrl}/matches/${ticketId}`);
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
