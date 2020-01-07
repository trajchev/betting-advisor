import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

export class HttpErrorInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
        return next.handle(request)
            .pipe(
                retry(1),
                catchError((error: HttpErrorResponse) => {
                    let errorMessage = '';
                    if (error.error instanceof ErrorEvent) {
                        // This is a clientside error
                        errorMessage = `Error: ${error.error.message}`;
                    } else {
                        // This is a server side error
                        if (error.status === 404) {
                            errorMessage = `We couldn\'t find what you were looking for!\n${error.message}`;
                        } else {
                            errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
                        }
                    }
                    window.alert(errorMessage);
                    return throwError(errorMessage);
                })
            );
    }
}
