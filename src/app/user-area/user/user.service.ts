import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError, map } from 'rxjs/operators';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getActiveUser(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/users/me`)
    .pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  fetchUserTickets(ticketsPerPage: number, page: number): Observable<any> {
    return this.http.get(`${environment.apiUrl}/users/me/tickets/${ticketsPerPage}/${page}`)
    .pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  fetchDashboardData(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/users/dashboard`)
    .pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  updateUser(username: string): Observable<any> {
    return this.http.patch(`${environment.apiUrl}/users/me/update`, {username});
  }

  // Error handler
  handleError(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}
