import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

import { environment } from '../../environments/environment';
import { Auth } from './auth.model';

// get the API url
const BACKEND_URL = environment.apiUrl;

interface RegisterResponseData {
  status: string;
  token: string;
  expiresIn: number;
  data: {
    user: {
      photo: string,
      role: string,
      active: boolean,
      id: number,
      username: string,
      email: string,
      passwordConfirm: boolean,
      updatedAt: Date,
      createdAt: Date
    }
  };
}

interface LoginResponseData {
  status: string;
  token: string;
  expiresIn: number;
  data: {
    user: {
      photo: string,
      role: string,
      active: boolean,
      id: number,
      username: string,
      email: string,
      passwordConfirm: boolean,
      passwordResetToken: string,
      passwordResetExpires: number,
      updatedAt: Date,
      createdAt: Date
    }
  };
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isAuthenticated = false;
  private token: string;
  private tokenTimer: any;

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

  // Emit user login/logout
  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  // Send request for creating the user
  signup(username: string, email: string, password: string, passwordConfirm: string) {
    if (password !== passwordConfirm) {
      return;
    }
    const authData = { username, email, password, passwordConfirm };
    return this.http.post<RegisterResponseData>(`${BACKEND_URL}/users/signup`, authData).subscribe(
      (response) => {
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
    const authData: Auth = {email, password};
    this.http
      // This request will get token, expiration time of the token and user id
      .post<LoginResponseData>(`${BACKEND_URL}/users/login`, authData)
      .subscribe(
        response => {
          const token = response.token;
          this.token = token;
          if (token) {
            const expiresInDuration = response.expiresIn;
            this.setAuthTimer(expiresInDuration);
            this.isAuthenticated = true;
            this.authStatusListener.next(true);
            const now = new Date();
            // Set expiration date/time
            const expirationDate = new Date(now.getTime() + expiresInDuration);
            this.saveAuthData(token, expirationDate);
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
      this.setAuthTimer(expiresIn);
      this.authStatusListener.next(true);
    }
  }

  // Logout functionality
  logout() {
    this.token = null;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.router.navigate(['/login']);
  }

  // Set the timer for auto logiing out
  private setAuthTimer(duration: number) {
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration);
  }

  // Save authentication data to local storage
  private saveAuthData(token: string, expirationDate: Date) {
    localStorage.setItem('token', token);
    localStorage.setItem('expiration', expirationDate.toISOString());
  }

  // Clear auth data from local storage
  private clearAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
  }

  // Retrieve authentication data from local storage
  private getAuthData() {
    const token = localStorage.getItem('token');
    const expirationDate = localStorage.getItem('expiration');
    if (!token || !expirationDate) {
      return;
    }
    return {
      token: token,
      expirationDate: new Date(expirationDate),
    };
  }
}
