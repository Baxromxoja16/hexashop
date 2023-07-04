import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Products } from '../core/models/products';
import { ProductsMoreService } from '../core/services/products-more.service';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.scss']
})
export class CartPageComponent implements OnInit, OnDestroy {
  title = { title: 'Cart page', text: '', about: true }

  subscription: Subscription = new Subscription();

  cardData: Products[] = JSON.parse(localStorage.getItem('card')!);

  constructor(private productsMoreService: ProductsMoreService, private router: Router) { }

  ngOnInit(): void {
    this.subscription.add(this.productsMoreService.productsSee('card', localStorage.getItem('productId')!).subscribe());
  }

  view(param: string, id: string) {
    if (param === 'more') {
      this.productsMoreService.productsSee(param, id).subscribe();
      this.router.navigate(['/single-product']);
    } else {
      localStorage.removeItem('productId');
      const deleted = this.cardData.filter((data) => data.id !== id);
      localStorage.setItem('card', JSON.stringify(deleted));
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
