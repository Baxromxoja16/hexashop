import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  baseUrl = 'https://hexashop-so83.onrender.com/';

  adminToken = JSON.parse(localStorage.getItem('admin-token')!);


  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Admin ${this.adminToken}`
  });
  constructor(private http: HttpClient) { }

  getUsers() {
    return this.http.get<any>(this.baseUrl + 'users/', { headers: this.headers })
  }
}
