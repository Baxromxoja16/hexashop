import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { Products } from '../models/products';

@Injectable({
  providedIn: 'root'
})
export class ProductsMoreService {
  baseUrl = 'http://localhost:3004/';

  cardData: Products[] = JSON.parse(localStorage.getItem('card')!) || [];

  constructor(private http: HttpClient, private router: Router) { }

  productsSee(param: string, id: string) {
    id ? localStorage.setItem('productId', id): localStorage.removeItem('productId');
    if (param === 'more') {
      this.router.navigate(['/single-product']);
      return this.http.get<Products>(this.baseUrl + 'goods/item/' + id);
    }
    else { // param === 'card'
      return this.http.get<Products>(this.baseUrl + 'goods/item/' + id).pipe(tap((data) => {

        // Valitation for localStorage
        if(this.cardData.length > 0) {
          const found = this.cardData.find((val) => val.id === id);
          if(found === undefined) this.cardData.push(data);
        } else {
          this.cardData.push(data);
        }

        localStorage.setItem('card', JSON.stringify(this.cardData));
      }));
    }
  }
}
