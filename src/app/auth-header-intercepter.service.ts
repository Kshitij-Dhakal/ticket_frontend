import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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
    return next.handle(req);
  }
}