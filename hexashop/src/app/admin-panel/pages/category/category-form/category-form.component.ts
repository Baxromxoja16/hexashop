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
    name: new FormControl('', Validators.required),
    img: new FormControl('', [Validators.required, Validators.pattern(this.imgRegex)]),
    subCategories: this.fb.array([])
  })

  editCategory!: Categories

  subscription: Subscription = new Subscription();

  constructor(public categoryService: CategoryService, private fb: FormBuilder) { }

  ngOnInit(): void {
    // console.log(this.categoryService.categoryChanged$);
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

  initEditCategory() {
    this.categoryService.categoryChanged$.subscribe(data => {
      this.createCategory.patchValue({
        name: data.name,
        img: data.img,
        subCategories: [...data.subCategories],
      })
      console.log(this.createCategory.value);
    })
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

