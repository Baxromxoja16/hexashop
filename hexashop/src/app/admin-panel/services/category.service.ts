import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, tap } from 'rxjs';
import { Categories, SubCategory } from '../modules/category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  baseUrl = 'https://hexashop-so83.onrender.com/'

  adminToken = JSON.parse(localStorage.getItem('admin-token')!);

  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Admin ${this.adminToken}`
  });

  categoryChanged$: Subject<Categories> = new Subject<Categories>();

  constructor(private http: HttpClient, private router: Router) { }

  getCategories() {
    return this.http.get<Categories[]>(this.baseUrl + 'category');
  }

  addCategory(data: any) {
    return this.http.post(this.baseUrl + 'category', data, { headers: this.headers });
  }

  deleteCategory(id: string) {
    return this.http.delete(this.baseUrl + 'category/' + id, { headers: this.headers }).pipe(tap((data) => {
      this.router.navigate(['/admin/category/new'])
    }));
  }

  editCategory(id: string) {
    
    // return this.http.get<Categories>(this.baseUrl + 'category/' + id, { headers: this.headers }).pipe(tap(data => {
    //   this.categoryChanged$.next(data);
    //   this.router.navigate(['/admin/category/edit']);
    // }));
  }


}
