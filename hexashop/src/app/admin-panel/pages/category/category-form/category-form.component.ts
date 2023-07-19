import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Categories, SubCategory } from 'src/app/admin-panel/modules/category.model';
import { CategoryService } from 'src/app/admin-panel/services/category.service';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss']
})
export class CategoryFormComponent implements OnInit, OnDestroy {
  imgRegex = new RegExp(/^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/gm)

  createCategory = new FormGroup({
    name: new FormControl(null, Validators.required),
    img: new FormControl(null, [Validators.required, Validators.pattern(this.imgRegex)]),
    subCategories: this.fb.array([])
  })

  subscription: Subscription = new Subscription();

  constructor(private categoryService: CategoryService, private fb: FormBuilder) { }

  ngOnInit(): void {
  }

  get subCategoryForm() {
    return this.createCategory.get('subCategories') as FormArray;
  }

  addSubCategry() {
    const subCategoryGr = this.fb.group({ category: [] });
    this.subCategoryForm.push(subCategoryGr);
  }

  deleteSubCategory(id: number) {
    this.subCategoryForm.removeAt(id);
  }

  onSubmit() {
    if(this.createCategory.valid) {
      this.subscription.add(this.categoryService.addCategory(this.createCategory.value).subscribe());
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }
}

