import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, tap } from 'rxjs';
import { Login, TokenRes } from 'src/app/core/models/auth.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl = 'http://localhost:8060/'

  tokenExpirationTimer: any;

  isLogin = new BehaviorSubject(localStorage.getItem('token')! || false);

  constructor(private http: HttpClient, private router: Router) { }

  login(data: any) {
    this.handleAuthentication('data.token', 'data.refToken');
    this.router.navigate(['/main']);
    return this.http.post<TokenRes>(this.baseUrl + 'auth/login', data).pipe(tap(data => {
    }))
  }

  handleAuthentication<T>(token: T, refToken: T) {
    this.autoLogout(36000); // must be change
    this.isLogin.next(true);
    localStorage.setItem('token', JSON.stringify(token));
    localStorage.setItem('refresh', JSON.stringify(refToken));
  }

  logout() {
    this.router.navigate(['/login']);
    localStorage.removeItem('token');
    this.isLogin.next(false);
  }

  autoLogout(exprestionTimer: number) {
    setTimeout(() => {
      this.logout();
    }, exprestionTimer);
  }
}
