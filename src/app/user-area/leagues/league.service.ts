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

  fetchMatch(sportKey: string, id: number, oddType: string): Observable<any> {
    return this.http
      .get(`${environment.apiUrl}/matches/${sportKey}/${id}/${oddType}`)
      .pipe(
        catchError(error => {
          return [];
        })
      );
  }

  addToTickets(matchId: number) {
    const match = {docId: matchId};
    return this.http.post<SavedGame>(`${environment.apiUrl}/matches/`, match);
  }

  deleteTicket(id: number) {
    return this.http.delete(`${environment.apiUrl}/matches/${id}`);
  }
}
