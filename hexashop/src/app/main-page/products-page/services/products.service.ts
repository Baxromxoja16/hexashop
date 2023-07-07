import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  baseUrl = 'http://localhost:3004/'

  constructor(private http: HttpClient) {}

  getCategoryProducts() {
    return this.http.get(this.baseUrl + 'goods/category/clothes/');
  }
}
