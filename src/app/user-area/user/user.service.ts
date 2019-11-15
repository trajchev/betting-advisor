import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError, map } from 'rxjs/operators';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  apiURL = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getActiveUser(): Observable<any> {
    return this.http.get(this.apiURL + `/users/me`)
    .pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  fetchUserTickets(): Observable<any> {
    return this.http.get(this.apiURL + `/users/me/tickets`)
    .pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  fetchDashboardData(): Observable<any> {
    return this.http.get(this.apiURL + `/users/dashboard`)
    .pipe(
      retry(1),
      catchError(this.handleError)
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
    return throwError(errorMessage);
  }
}
