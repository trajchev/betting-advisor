import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  apiURL = 'http://localhost:3000/api';

  // Set dummy data
  user = {
    firstName: 'Ivan',
    lastName: 'Trajchev',
    username: 'Ivanche',
    email: 'ivan@yahoo.com',
    password: '***',
    dateAdded: new Date()
  };

  constructor(private http: HttpClient) { }

  getUsers(): Observable<any> {
    return this.http.get(this.apiURL + '/users')
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
