import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Products } from '../../core/models/products.model';
import { ProductsMoreService } from '../../core/services/products-more.service';

@Component({
  selector: 'app-single-product-page',
  templateUrl: './single-product-page.component.html',
  styleUrls: ['./single-product-page.component.scss']
})
export class SingleProductPageComponent implements OnInit, OnDestroy {
  title = { title: 'Products', text: 'Learn more about us', about: false }

  product$!: Observable<Products>;

  subscription: Subscription = new Subscription();

  count = 1;

  totalPrice = 0;
  productPrice = 0;

  constructor(private productsMoreService: ProductsMoreService) { }

  ngOnInit(): void {
    this.product$ = this.productsMoreService.productsSee('more', localStorage.getItem('productId')!);
    this.subscription.add(this.productsMoreService.productsSee('more', localStorage.getItem('productId')!).subscribe((data) => {
      this.productPrice = data.price;
      this.totalPrice = data.price;
    }))
  }

  addToCart() {
    this.subscription.add(this.productsMoreService.productsSee('card', localStorage.getItem('productId')!).subscribe());
  }

  amount(type: string) {
    if (type === 'decriment') {
      this.count--
      this.totalPrice -= this.productPrice;
      this.totalPrice < this.productPrice ? this.totalPrice = this.productPrice :  this.totalPrice;
      this.count < 1 ? this.count = 1 :  this.count;
    } else {
      this.count++;
      this.totalPrice += this.productPrice;
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
