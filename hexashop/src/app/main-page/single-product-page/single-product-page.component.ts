import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { BuyProducts, Product } from 'src/app/core/models/buy.model';
import { Products } from '../../core/models/products.model';
import { ProductsMoreService } from '../../core/services/products-more.service';
import { SingleBuyService } from './services/single-buy.service';

@Component({
  selector: 'app-single-product-page',
  templateUrl: './single-product-page.component.html',
  styleUrls: ['./single-product-page.component.scss']
})
export class SingleProductPageComponent implements OnInit, OnDestroy {
  title = { title: 'Single Product', text: 'Learn more about us', about: false }

  product$!: Observable<Products>;

  subscription$: Subscription = new Subscription();

  count = 1;

  totalPrice = 0;
  productPrice = 0;
  product: any = {}
  confirmRes: boolean = false;
  isLoading = false;

  constructor(private productsMoreService: ProductsMoreService, private singleBuyService: SingleBuyService) { }

  ngOnInit(): void {
    this.product$ = this.productsMoreService.productsSee('more', localStorage.getItem('productId')!);
    this.isLoading = true;
    this.subscription$.add(this.productsMoreService.productsSee('more', localStorage.getItem('productId')!).subscribe((data) => {
      this.product = data;
      this.productPrice = data.price;
      this.totalPrice = data.price;
      this.isLoading = false;       
    }))
  }

  addToCart() {
    this.subscription$.add(this.productsMoreService.productsSee('card', localStorage.getItem('productId')!).subscribe());
  }

  amount(type: string) {
    if (type === 'decriment') {
      this.count--
      this.totalPrice -= this.productPrice;
      this.totalPrice < this.productPrice ? this.totalPrice = this.productPrice : this.totalPrice;
      this.count < 1 ? this.count = 1 : this.count;
    } else {
      if(this.product.availableAmount > this.count) {
        this.count++;
        this.totalPrice += this.productPrice;
      }
    }
  }

  buy() {
    const buyProducts: BuyProducts = {
      name: "",
      phone: localStorage.getItem('phone')!,
      list: [
        {
          name: this.product.name,
          amount: this.count,
          price: this.product.price
        }
      ],
      totalPrice: this.totalPrice
    }

    this.confirmRes = confirm('Do you want to buy this product?');
    if(this.confirmRes) {
      this.subscription$.add(this.singleBuyService.buy(buyProducts).subscribe());
      setTimeout(() => {
        this.confirmRes = false;
      }, 2000);
    }
  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe();

  }
}
