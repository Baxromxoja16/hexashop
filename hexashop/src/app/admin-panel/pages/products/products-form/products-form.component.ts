import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProductsService } from 'src/app/admin-panel/services/products.service';
import { Product } from 'src/app/core/models/products.model';

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
  img = this.fb.array([]);
  availableAmount = 0;
  price = 0;
  category = '';
  description = '';

  subscription: Subscription = new Subscription();

  constructor(private fb: FormBuilder, private productsService: ProductsService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.subscription.add(this.route.params.subscribe((params) => {
      this.productId = params['id'];
      this.editMode = params['id'] !== null;
      this.initForm();
    }))
  }

  onSubmit() {
    if (this.createGoods.valid) {
      const good = this.createGoods.value;
      this.subscription.add(this.productsService.updateProduct(good, this.productId).subscribe(data => {
        this.router.navigate(['/admin/products']);
      }));
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

  private initForm() {
    if (this.editMode) {
      const data = this.productsService.getProduct(this.productId);
      this.name = data[0].name
      this.availableAmount = data[0].availableAmount
      this.price = data[0].price
      this.category = data[0].category
      this.description = data[0].description

      for (let image of data[0].imageUrls) {
        this.img.push(
          new FormControl(image)
        )
      }
    }

    this.createGoods = new FormGroup({
      'name': new FormControl(this.name, Validators.required),
      'imageUrls': this.img,
      'availableAmount': new FormControl(this.availableAmount, Validators.required),
      'price': new FormControl(this.price, Validators.required),
      'category': new FormControl(this.category, Validators.required),
      'description': new FormControl(this.description, Validators.required),
    });
  }
}
