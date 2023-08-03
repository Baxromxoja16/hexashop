import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReplaySubject, tap } from 'rxjs';
import { Product, Products } from 'src/app/core/models/products.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  baseUrl = 'https://hexashop-so83.onrender.com/';

  adminToken = JSON.parse(localStorage.getItem('admin-token')!);

  products: Product[] = [];

  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Admin ${this.adminToken}`
  });

  constructor(private http: HttpClient) { }

  getProducts() {
    return this.http.get<Product[]>(this.baseUrl + 'goods/')
      .pipe(tap((data) => {
        this.products = data;
      }));
  }
  getProduct(index: string) {
    return this.products.filter((val: Product) => val._id === index);
  }

  postProduct(data: Product) {
    return this.http.post(this.baseUrl + 'goods/', JSON.stringify(data), { headers: this.headers })
  }

  updateProduct(data: Product, id: string) {
    return this.http.put(this.baseUrl + 'goods/' + id, JSON.stringify(data), { headers: this.headers })
  }

  deleteProduct(id: string) {
    return this.http.delete(this.baseUrl + 'goods/' + id, { headers: this.headers })
  }
}
