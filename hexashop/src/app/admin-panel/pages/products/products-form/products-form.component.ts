import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Categories } from 'src/app/admin-panel/modules/category.model';
import { CategoryService } from 'src/app/admin-panel/services/category.service';
import { ProductsService } from 'src/app/admin-panel/services/products.service';

@Component({
  selector: 'app-products-form',
  templateUrl: './products-form.component.html',
  styleUrls: ['./products-form.component.scss']
})
export class ProductsFormComponent implements OnInit, OnDestroy {
  editMode = false;
  createGoods!: FormGroup;
  productId = ''
  name = '';
  img = '';
  availableAmount: null | number = null;
  price: null | number = null;
  category = '';
  description = '';

  categories: Categories[] = []

  subscription: Subscription = new Subscription();

  constructor(
    private productsService: ProductsService,
    private route: ActivatedRoute,
    private router: Router,
    private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe(data => {
      this.categories = data;
    })

    this.route.params.subscribe((params) => {
      this.productId = params['id'];
      if (this.productId) {
        this.editMode = params['id'] !== null;
      }
      this.initForm();
    })
  }

  onSubmit() {
    if (this.createGoods.valid) {
      const good = this.createGoods.value;
      if (this.editMode) {
        this.subscription.add(this.productsService.updateProduct(good, this.productId).subscribe((data) => {
          this.router.navigate(['/admin/products']);
        }));
      } else {
        this.productsService.postProduct(good).subscribe(res => {
          this.router.navigate(['/admin/products']);
        });
      }
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
    this.editMode = false;
  }

  private initForm() {
    if (this.editMode) {
      const data = this.productsService.getProduct(this.productId);
      this.name = data[0].name
      this.availableAmount = data[0].availableAmount
      this.price = data[0].price
      this.category = data[0].category
      this.description = data[0].description
      this.img = data[0].imageUrls
    }

    this.createGoods = new FormGroup({
      'name': new FormControl(this.name, Validators.required),
      'imageUrls': new FormControl(this.img, Validators.required),
      'availableAmount': new FormControl(this.availableAmount, Validators.required),
      'price': new FormControl(this.price, Validators.required),
      'category': new FormControl(this.category, Validators.required),
      'description': new FormControl(this.description, Validators.required),
    });
  }

  // addImage() {
  //   const imageGr = new FormControl('', Validators.required);
  //   this.imageUrls.controls.push(imageGr);
  // }

  get imageUrls() {
    return this.createGoods.get('imageUrls') as FormArray;
  }

}
