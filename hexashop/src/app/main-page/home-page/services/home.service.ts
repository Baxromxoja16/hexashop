import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, map, mergeAll, mergeMap, Subject, tap } from 'rxjs';
import { Products } from 'src/app/core/models/products.model';

import { Categories } from '../home-page.component';

@Injectable({
  providedIn: 'root'
})
export class HomeService implements OnInit {
  baseUrl = 'https://hexashop-so83.onrender.com/';

  clothes$: Subject<Products> = new Subject();

  constructor(private http: HttpClient) { }

  ngOnInit(): void { }

  getCategories() {
    return this.http.get<any>(this.baseUrl + 'category');
  }

  getClothes(category: string) {
    this.setLocalStorage(category);

    return this.http.get<Products>(this.baseUrl + 'goods/category/clothes/' + category)
      .pipe(tap((res) => {
        this.clothes$.next(res);
      }));
  }

  setLocalStorage(category: string) {
    if (category !== "") {
      localStorage.setItem('category', category);
    }
  }
}
