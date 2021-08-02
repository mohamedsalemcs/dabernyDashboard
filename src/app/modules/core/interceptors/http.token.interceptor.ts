/* #region  Imports */
import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../../auth/services/auth.service';
/* #endregion */

@Injectable()
export class HttpTokenInterceptor implements HttpInterceptor {

  /* #region   Constructor*/
  constructor(
    private authService: AuthService
  ) { }
  /* #endregion */

  /* #region  Methods */
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const headersConfig = {};
    const token = this.authService.getToken();
    if (token) {
      headersConfig['Authorization'] = `Bearer ${token}`;
    }
    return next.handle(req.clone({ setHeaders: headersConfig }))
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.error('Error,', error);
          return throwError(error);
        }
        ));
    // .catch(error => {
    //   console.error('Error,', error);
    //   return throwError(error);
    // });
  }

  /* #endregion */
}
