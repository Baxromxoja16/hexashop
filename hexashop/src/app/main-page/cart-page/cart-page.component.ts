import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Products } from '../../core/models/products.model';
import { ProductsMoreService } from '../../core/services/products-more.service';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.scss']
})
export class CartPageComponent implements OnInit, OnDestroy {
  title = { title: 'Cart page', text: '', about: true }

  constructor(private productsMoreService: ProductsMoreService, private router: Router) { }

  cardData: Products[] = this.productsMoreService.cardData;

  subscription: Subscription = new Subscription()

  ngOnInit(): void {
  }

  view(param: string, id: string) {
    if (param === 'more') {
      const productSee = this.productsMoreService.productsSee(param, id).subscribe();
      this.subscription.add(productSee)

      this.router.navigate(['/single-product']);
    } else {
      const found = this.cardData.findIndex((data) => data._id === id);
      const deleted = this.cardData.splice(found, 1);
      localStorage.setItem('card', JSON.stringify(this.cardData));
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }
}
