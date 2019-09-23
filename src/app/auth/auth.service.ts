import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

import { environment } from '../../environments/environment';
import { Auth } from './auth.model';

// get the API url
const BACKEND_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isAuthenticated = false;
  private token: string;
  private tokenTimer: any;
  private userId: number;
  private userName: string;
  private email: string;
  private joined: string;

  private authStatusListener = new Subject<boolean>();

  constructor(private http: HttpClient, private router: Router) { }

  // Retieve the token
  getToken() {
    return this.token;
  }

  // Return user status
  getIsAuth() {
    return this.isAuthenticated;
  }

  // Retrieve the logged in user id
  getUserId() {
    return this.userId;
  }

  // Emit user login/logout
  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  // Send request for creating the user
  createUser(username: string, email: string, password: string) {
    const authData = { username: username, email: email, password: password };
    this.http.put(`${BACKEND_URL}/user/signup`, authData).subscribe(
      (response) => {
        console.log(response);
        this.router.navigate(['/profile']);
      },
      error => {
        this.authStatusListener.next(false);
      }
    );
  }

  // Login user
  login(email: string, password: string) {
    // get the user info as an object so we can send it with the login request
    const authData: Auth = {email: email, password: password };
    this.http
      // This request will get token, expiration time of the token and user id
      .post<{ token: string; expiresIn: number; userId: number }>(
        BACKEND_URL + '/user/login',
        authData
      )
      .subscribe(
        response => {
          console.log(response);
          const token = response.token;
          this.token = token;
          if (token) {
            const expiresInDuration = response.expiresIn;
            this.setAuthTimer(expiresInDuration);
            this.isAuthenticated = true;
            this.userId = response.userId;
            // this.userName = response.user.userName;
            this.authStatusListener.next(true);
            const now = new Date();
            // Set expiration date/time
            const expirationDate = new Date(
              now.getTime() + expiresInDuration * 1000
            );
            console.log(expirationDate);
            this.saveAuthData(token, expirationDate, this.userId);
            // Once logged in, navigate to dashboard
            this.router.navigate(['/dashboard']);
          }
        },
        error => {
          this.authStatusListener.next(false);
        }
      );
  }

  // Clear auth data when expiration date/time runs out (1 hour)
  autoAuthUser() {
    const authInfo = this.getAuthData();
    if (!authInfo) {
      return;
    }
    const now = new Date();
    const expiresIn = authInfo.expirationDate.getTime() - now.getTime();
    if (expiresIn > 0) {
      this.token = authInfo.token;
      this.isAuthenticated = true;
      this.userId = authInfo.userId;
      this.setAuthTimer(expiresIn / 1000);
      this.authStatusListener.next(true);
    }
  }

  // Logout functionality
  logout() {
    this.token = null;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    this.userId = null;
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.router.navigate(['/']);
  }

  // Set the timer for auto logiing out
  private setAuthTimer(duration: number) {
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000);
  }

  // Save authentication data to local storage
  private saveAuthData(token: string, expirationDate: Date, userId: number) {
    localStorage.setItem('token', token);
    localStorage.setItem('expiration', expirationDate.toISOString());
    localStorage.setItem('userId', userId.toString());
  }

  // Clear auth data from local storage
  private clearAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
    localStorage.removeItem('userId');
  }

  // Retrieve authentication data from local storage
  private getAuthData() {
    const token = localStorage.getItem('token');
    const expirationDate = localStorage.getItem('expiration');
    const userId = +localStorage.getItem('userId');
    if (!token || !expirationDate) {
      return;
    }
    return {
      token: token,
      expirationDate: new Date(expirationDate),
      userId: userId
    };
  }
}
