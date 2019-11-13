import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { environment } from '../../environments/environment';

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

  fetchMatch(sportKey: string, id: number): Observable<any> {
    return this.http
      .get(`${environment.apiUrl}/matches/${sportKey}/${id}`)
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
