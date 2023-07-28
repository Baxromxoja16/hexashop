import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Products } from 'src/app/core/models/products.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  baseUrl = 'https://hexashop-so83.onrender.com/';

  adminToken = JSON.parse(localStorage.getItem('admin-token')!);

  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Admin ${this.adminToken}`
  });

  constructor(private http: HttpClient) { }

  getProducts() {
    return this.http.get<Products[]>(this.baseUrl + 'goods/');
  }
}
