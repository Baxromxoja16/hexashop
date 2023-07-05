import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Products } from '../core/models/products';
import { ProductsMoreService } from '../core/services/products-more.service';

@Component({
  selector: 'app-single-product-page',
  templateUrl: './single-product-page.component.html',
  styleUrls: ['./single-product-page.component.scss']
})
export class SingleProductPageComponent implements OnInit, OnDestroy{
  title = { title: 'Products', text: 'Learn more about us', about: false }

  product$!: Observable<Products>;

  subscription: Subscription = new Subscription();

  constructor(private productsMoreService: ProductsMoreService){}

  ngOnInit(): void {
    this.product$ = this.productsMoreService.productsSee('more', localStorage.getItem('productId')!);
  }

  addToCart() {
   this.subscription.add(this.productsMoreService.productsSee('card', localStorage.getItem('productId')!).subscribe());
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
