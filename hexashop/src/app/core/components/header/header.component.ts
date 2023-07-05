import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { HomeService } from 'src/app/home-page/services/home.service';
import { ProductsMoreService } from '../../services/products-more.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  subscription$: Subscription = new Subscription();

  countCarts = this.productsMoreService.cardData;

  constructor(private router: Router, private homeService: HomeService, private productsMoreService: ProductsMoreService){}


  onDiscoverMore(id: string) {
    this.subscription$.add(this.homeService.getClothes(id).subscribe());
    this.router.navigate(['/category']);
  }
}
