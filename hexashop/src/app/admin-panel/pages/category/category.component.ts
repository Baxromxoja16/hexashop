import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Categories } from '../../modules/category.model';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit, OnDestroy {
  categories: Categories[] = [];

  subscription$: Subscription = new Subscription();

  editCategoryData!: Categories;

  constructor(private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.subscription$.add(this.categoryService.getCategories()
    .subscribe((data: Categories[]) => this.categories = data));
  }

  edit(id: string) {
    this.subscription$.add(this.categoryService.editCategory(id).subscribe())
  }

  deleteCategory(id: string) {
    this.subscription$.add(this.categoryService.deleteCategory(id).subscribe());
  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }
}
