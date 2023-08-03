import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BuyProducts } from 'src/app/core/models/buy.model';

@Injectable({
  providedIn: 'root'
})
export class SingleBuyService {
  baseUrl = 'https://hexashop-so83.onrender.com/'

  constructor(private http: HttpClient) { }

  buy(data: BuyProducts) {
    return this.http.post(this.baseUrl + 'users/buy', data);
  }
}
