import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Categories } from '../home-page.component';

@Injectable({
  providedIn: 'root'
})
export class HomeService implements OnInit {
  baseUrl = 'http://localhost:3004/';

  constructor(private http: HttpClient) { }

  ngOnInit(): void {

  }

  getCategories() {
    return this.http.get<Categories>(this.baseUrl + 'categories/clothes');
  }

}
