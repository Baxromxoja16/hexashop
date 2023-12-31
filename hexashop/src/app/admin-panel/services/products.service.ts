import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReplaySubject, map, tap } from 'rxjs';
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

  getFakeProducts() {
    return this.http.get<any>('https://api.escuelajs.co/api/v1/products')
      .pipe(map(data => {
        
        return data.map((item: any) => {
          return {
            name: `${item.title} ${item.id}`,
            imageUrls: item.images[0],
            availableAmount: 23,
            description: item.description,
            price: +item.price,
            category: "64b7ab932fc2ed4378cb8d66",
          }
        })

      }))
  }

  getProducts(page: number) {
    this.headers.set('page', page.toString());

  return this.http.get<Product[]>(this.baseUrl + 'goods/' + page, { headers: this.headers })
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
