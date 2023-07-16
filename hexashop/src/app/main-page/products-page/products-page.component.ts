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

  products: any = [];

  constructor(private productsService: ProductsService, private productsMoreService: ProductsMoreService, public loaderService: LoaderService) { }

  ngOnInit(): void {
    this.loaderService.setLoading(true);

    this.subscription$.add(this.productsService.getCategoryProducts().subscribe((data) => {
      this.products = data;
      this.loaderService.setLoading(false);
    }))
  }

  productSee(param: string, id: string) {
    this.subscription$.add(this.productsMoreService.productsSee(param, localStorage.getItem('productId')!).subscribe());
    this.subscription$.add(this.productsMoreService.productsSee(param, id).subscribe());
  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }
}
