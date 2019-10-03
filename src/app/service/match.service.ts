import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MatchService {

  apiURL = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }

  getMatches(sportKey): Observable<any> {
    return this.http.get(this.apiURL + `/match/matches/${sportKey}`)
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
    window.alert(errorMessage);
    return throwError(errorMessage);
  }
}
