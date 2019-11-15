import {
    HttpInterceptor,
    HttpRequest,
    HttpHandler
  } from '@angular/common/http';
  import { Injectable } from '@angular/core';

  import { AuthService } from './auth.service';

  @Injectable()
  export class AuthInterceptor implements HttpInterceptor {
    constructor(private authService: AuthService) {}

    // Create http interceptor for sending token, if user authenticated, with each request
    intercept(req: HttpRequest<any>, next: HttpHandler) {
      const authToken = this.authService.getToken();
      // Clone the request, so we don't mess up our original request, and attach Auth header
      const authRequest = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${authToken}`)
      });
      return next.handle(authRequest);
    }
  }
