import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, tap } from 'rxjs';
import { Login, TokenRes } from 'src/app/core/models/auth.model';

const minute = 60000
const hour = minute * 60;
const day = hour * 24;

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl = 'https://hexashop-so83.onrender.com/'

  tokenExpirationTimer: any;

  isLogin = new BehaviorSubject(localStorage.getItem('token')! || false);

  headers = new HttpHeaders({"Content-Type": "application/json"})

  constructor(private http: HttpClient, private router: Router) { }

  login(data: any) {
    return this.http.post<TokenRes>(this.baseUrl + 'auth/login', JSON.stringify(data), {headers:this.headers}).pipe(tap(res => {
      this.handleAuthentication(res.accesToken, res.refreshToken, data.phone);
      this.router.navigate(['/main']);
    }))
  }

  register(data: any) {
    return this.http.post<TokenRes>(this.baseUrl + 'auth/register', JSON.stringify(data), {headers:this.headers}).pipe(tap(res => {
      this.handleAuthentication(res.accesToken, res.refreshToken, data.phone);
      this.router.navigate(['/main']);
    }))
  }

  handleAuthentication<T>(token: T, refToken: T, phone: T) {
    this.autoLogout(day * 3);
    this.isLogin.next(true);
    localStorage.setItem('token', JSON.stringify(token));
    localStorage.setItem('refresh', JSON.stringify(refToken));
    localStorage.setItem('phone', JSON.stringify(phone));
  }

  logout() {
    localStorage.removeItem('token');
    this.isLogin.next(false);
  }

  autoLogout(exprestionTimer: number) {
    setTimeout(() => {
      this.logout();
    }, exprestionTimer);
  }
}
