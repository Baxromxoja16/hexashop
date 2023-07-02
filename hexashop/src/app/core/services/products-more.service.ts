import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Products } from '../models/products';

@Injectable({
  providedIn: 'root'
})
export class ProductsMoreService {
  baseUrl = 'http://localhost:3004/';

  constructor(private http: HttpClient) { }

  productsSee(id: string) {
    localStorage.setItem('productId', id);

    return this.http.get<Products>(this.baseUrl + 'goods/item/' + id);
  }
}
