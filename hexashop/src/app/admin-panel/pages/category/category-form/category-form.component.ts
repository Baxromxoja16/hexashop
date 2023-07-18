import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { SubCategory } from 'src/app/admin-panel/modules/category.model';
import { CategoryService } from 'src/app/admin-panel/services/category.service';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss']
})
export class CategoryFormComponent implements OnInit {
  createCategory = new FormGroup({
    name: new FormControl(null, Validators.required),
    image: new FormControl(null, Validators.required),
    subCategory: this.fb.array([])
  })

  constructor(private categoryService: CategoryService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.categoryService.allSubCategoriesChanged.subscribe(data => {
      console.log(data);
    })
  }

  get subCategoryForm() {
    return this.createCategory.get('subCategory') as FormArray;
  }

  addSubCategry() {
    const subCategoryGr = this.fb.group({ category: [] });
    this.subCategoryForm.push(subCategoryGr);
    console.log(this.subCategoryForm);
  }

  deleteSubCategory(id: number) {
    this.subCategoryForm.removeAt(id);
  }

}

