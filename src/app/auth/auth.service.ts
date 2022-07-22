import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap, catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthRequest } from './auth-request';
import { AuthResponse } from './auth-response';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  tokens?: AuthResponse;
  err?: string;
  msg?: string;

  constructor(private http: HttpClient, private router: Router) { }

  isLoggedIn(): boolean {
    return this.tokens != undefined;
  }

  login(authRequest: AuthRequest): Observable<AuthResponse> {
    console.log('Logging in user ', authRequest)
    const payload = new HttpParams()
      .set('email', authRequest.email ?? '')
      .set('password', authRequest.password ?? '');
    return this.http
      .post<AuthResponse>(`${environment.apiURL}/api/login`, payload)
      .pipe(
        tap(authRes => this.handleSuccessResponse(authRes)),
        catchError((err: HttpErrorResponse) => {
          if (err.statusText.toLowerCase() === 'ok') {
            this.msg = undefined;
            return throwError(() => err.error);
          } else {
            console.log(err);
            return throwError(() => 'Something went wrong. Please try again later.');
          }
        })
      );
  }

  logout(): void {
    this.tokens = undefined;
    this.err = undefined;
    localStorage.removeItem('user');
    localStorage.removeItem('tokens');
    this.router.navigate(['auth']);
  }

  register(authRequest: AuthRequest): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(`${environment.apiURL}/register/employee`, authRequest)
      .pipe(
        tap(() => {
          this.msg = 'Register successful! Please login.'
        }),
        catchError((err: HttpErrorResponse) => {
          if (err.statusText.toLowerCase() === 'ok') {
            return throwError(() => err.error);
          } else {
            console.log(err);
            return throwError(() => 'Something went wrong. Please try again later.');
          }
        })
      );
  }

  private handleSuccessResponse(authResponse: AuthResponse) {
    localStorage.setItem('tokens', JSON.stringify(authResponse));
    this.tokens = authResponse;
    this.clearMsg();
  }

  autologin(): void {
    try {
      const json = localStorage.getItem('tokens');
      if (json) {
        const tokens: AuthResponse = JSON.parse(json);
        if (!tokens) {
          return;
        }
        this.tokens = tokens;
        this.err = undefined;
      }
    } catch (e) {
      this.err = 'Got error while getting user from session';
      console.log(e);
    }
  }

  clearMsg() {
    this.msg = undefined;
  }

  clearErrMsg() {
    this.err = undefined;
  }
}
