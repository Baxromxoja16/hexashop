import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Products } from 'src/app/core/models/products.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  baseUrl = 'https://hexashop-so83.onrender.com/'

  constructor(private http: HttpClient) {}

  getProducts(page: number = 1) {
    return this.http.get<Products[]>(this.baseUrl + 'goods/' + page)
  }
}
