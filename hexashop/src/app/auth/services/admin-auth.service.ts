import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, tap } from 'rxjs';
import { TokenRes } from 'src/app/core/models/auth.model';

const minute = 60000
const hour = minute * 60;
const day = hour * 24;

@Injectable({
  providedIn: 'root'
})

export class AdminAuthService {

  baseUrl = 'https://hexashop-so83.onrender.com/'

  tokenExpirationTimer: any;

  isLogin = new BehaviorSubject(JSON.parse(localStorage.getItem('admin-token')!) || false);

  headers = new HttpHeaders({ "Content-Type": "application/json" })

  constructor(private http: HttpClient, private router: Router) { }

  login(data: any) {
    return this.http.post<TokenRes>(this.baseUrl + 'auth/login/auth/admin', JSON.stringify(data), { headers: this.headers }).pipe(tap(res => {
      this.handleAuthentication(res.accesToken, res.refreshToken, data);
      this.router.navigate(['/admin']);
    }))
  }

  register(data: any) {
    return this.http.post<TokenRes>(this.baseUrl + 'auth/register/auth/admin', JSON.stringify(data), { headers: this.headers }).pipe(tap(res => {
      this.handleAuthentication(res.accesToken, res.refreshToken, data);
      this.router.navigate(['/admin']);
    }))
  }

  handleAuthentication<T>(token: T, refToken: T, data: T) {
    this.autoLogout(day * 3);
    this.isLogin.next(true);
    localStorage.setItem('admin-token', JSON.stringify(token));
    localStorage.setItem('admin-refresh', JSON.stringify(refToken));
    localStorage.setItem('admin-data', JSON.stringify(data));
  }

  logout() {
    localStorage.removeItem('admin-token');
    this.isLogin.next(false);
  }

  autoLogout(exprestionTimer: number) {
    setTimeout(() => {
      this.logout();
    }, exprestionTimer);
  }

  public isAuthenticated(): boolean {
    const token = localStorage.getItem('admin-token')!;
    // Check whether the token is expired and return
    // true or false
    return !token;
  }
}
