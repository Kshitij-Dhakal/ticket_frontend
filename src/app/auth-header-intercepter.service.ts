import { HttpEvent, HttpEventType, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { AuthService } from './auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthHeaderIntercepterService implements HttpInterceptor {
  private AUTH_HEADER = "Authorization";

  constructor(private authService: AuthService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    req = req.clone({
      headers: req.headers.set(this.AUTH_HEADER, "Bearer " + this.authService.tokens?.access_token)
    })
    return next.handle(req)
      .pipe(
        tap((e) => {
          
        }),
        catchError((e) => {
          if (e.status == 401) {
            this.authService.logout()
          }
          return throwError(() => e)
        })
      );
  }
}
