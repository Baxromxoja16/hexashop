import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Products } from '../models/products.model';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  baseUrl = 'https://hexashop-so83.onrender.com/';

  constructor(private http: HttpClient) { }

  searchProduct(search: string) {
    let query = new HttpParams();
    query = query.set('name', search);
    return this.http.get<Products[]>(this.baseUrl + 'goods/search', { params: query });
  }
}
