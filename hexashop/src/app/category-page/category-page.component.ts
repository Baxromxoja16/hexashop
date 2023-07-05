import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Products } from '../core/models/products';
import { ProductsMoreService } from '../core/services/products-more.service';
import { HomeService } from '../home-page/services/home.service';

@Component({
  selector: 'app-category-page',
  templateUrl: './category-page.component.html',
  styleUrls: ['./category-page.component.scss']
})
export class CategoryPageComponent implements OnInit, OnDestroy {
  title = { title: 'Clothes', text: '', about: true };

  products: Products[] = [];

  subscription$: Subscription = new Subscription();

  constructor(
    private homeService: HomeService,
    private productsMoreService: ProductsMoreService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.subscription$.add(this.homeService.getClothes(localStorage.getItem('category')!).subscribe());

    this.subscription$.add(this.homeService.clothes$.subscribe((products: any) => {
      this.products = products
    }));
  }

  productSee(param: string, id: string) {
    this.subscription$.add(this.productsMoreService.productsSee(param, localStorage.getItem('productId')!).subscribe());
    this.subscription$.add(this.productsMoreService.productsSee(param, id).subscribe());
  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }
}
