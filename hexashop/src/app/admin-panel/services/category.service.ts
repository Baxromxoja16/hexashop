import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Categories, SubCategory } from '../modules/category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  baseUrl = 'https://hexashop-so83.onrender.com/'

  allSubCategoriesChanged = new Subject<SubCategory[]>();

  allSubCategories = [
    new SubCategory('Man'),
    new SubCategory('Woman'),
  ]

  constructor(private http: HttpClient) { }

  getCategories() {
    return this.http.get<Categories[]>(this.baseUrl + 'category');
  }

  addCategory(data: any) { }

  deleteCategory(id: string) { }

  editCategory(id: string) { }

  addSubCategories(category: string) {
    this.allSubCategories.push(new SubCategory(category))
    this.allSubCategoriesChanged.next(this.allSubCategories.slice());
  }

}
