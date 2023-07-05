import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, Subject, tap } from 'rxjs';
import { Products } from 'src/app/core/models/products';

import { Categories } from '../home-page.component';

@Injectable({
  providedIn: 'root'
})
export class HomeService implements OnInit {
  baseUrl = 'http://localhost:3004/';

  clothes$: Subject<Products> = new Subject();

  constructor(private http: HttpClient) { }

  ngOnInit(): void {}

  getCategories() {
    return this.http.get<Categories>(this.baseUrl + 'categories/clothes');
  }

  getClothes(category: string){
    this.setLocalStorage(category);

    return this.http.get<Products>(this.baseUrl + 'goods/category/clothes/' + category)
    .pipe(tap((res) => {
      this.clothes$.next(res);
    }));
  }

  setLocalStorage(category: string) {
    if(category !== "") {
      localStorage.setItem('category', category);
    }
  }
}
