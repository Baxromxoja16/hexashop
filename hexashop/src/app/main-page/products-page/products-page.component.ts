import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoaderService } from 'src/app/core/services/loader.service';
import { Products } from '../../core/models/products.model';
import { ProductsMoreService } from '../../core/services/products-more.service';
import { ProductsService } from './services/products.service';

@Component({
  selector: 'app-products-page',
  templateUrl: './products-page.component.html',
  styleUrls: ['./products-page.component.scss']
})
export class ProductsPageComponent implements OnInit, OnDestroy {
  title = { title: 'Products', text: 'Learn more about us', about: false }

  subscription$: Subscription = new Subscription();

  products: Products[] = [];

  pageNumber = 1

  constructor(private productsService: ProductsService, private productsMoreService: ProductsMoreService, public loaderService: LoaderService) { }

  ngOnInit(): void {
    this.loaderService.setLoading(true);

    this.subscription$.add(this.getGoods(this.pageNumber))
  }

  productSee(param: string, id: string) {
    this.subscription$.add(this.productsMoreService.productsSee(param, localStorage.getItem('productId')!).subscribe());
    this.subscription$.add(this.productsMoreService.productsSee(param, id).subscribe());
  }

  next() {
    this.pageNumber += 1;
    this.getGoods(this.pageNumber);
  }
  prev() {
    this.pageNumber -= 1;
    this.getGoods(this.pageNumber);
  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }

  private getGoods(page:number = 1) {
    this.productsService.getCategoryProducts(page).subscribe((data) => {
      this.products = data;
      this.loaderService.setLoading(false);
    })
  }
}
