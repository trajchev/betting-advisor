import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, pipe } from 'rxjs';
import { retry, catchError, map } from 'rxjs/operators';

const options = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class LeagueService {

  apiKey = 'cec3bab91a164e702a135a505dbbae59';

  apiURL = 'https://api.the-odds-api.com/v3';
  // private tickets: Ticket[] = [];
  private leagues = [];

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  getLeagues(): Observable<any> {
    return this.http
      .get(this.apiURL + '/sports/?apiKey=' + this.apiKey
        // this.apiURL + '/sport/?apiKey=' + this.apiKey
      )
      .pipe(
        map(response => {
          return response;
        }),
        catchError(error => {
          return [];
        })
      );
  }

  getOdds(sport): Observable<any> {
    return this.http
      .get(this.apiURL + '/odds/?sport=' + sport + '&region=uk' + '&apiKey=' + this.apiKey
        // this.apiURL + '/sport/?apiKey=' + this.apiKey
      )
      .pipe(
        map(response => {
          return response;
        }),
        catchError(error => {
          return [];
        })
      );
  }

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
