import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { Observable, Subject, Subscription, share, switchMap } from 'rxjs';
import { Products } from '../../core/models/products.model';
import { ProductsMoreService } from '../../core/services/products-more.service';
import { ProductsService } from './services/products.service';

@Component({
  selector: 'app-products-page',
  templateUrl: './products-page.component.html',
  styleUrls: ['./products-page.component.scss'],
})
export class ProductsPageComponent implements OnInit, OnDestroy {
  title = { title: 'Products', text: 'Learn more about us', about: false };

  subscription: Subscription = new Subscription();

  products: Products[] = [];

  page = 1;
  isLoading: boolean = false;

  isLast = false;

  constructor(
    private productsService: ProductsService,
    private productsMoreService: ProductsMoreService
  ) {}

  ngOnInit(): void {
    this.loadData()
  }

  loadData() {
    this.isLoading = true;
    const getProducts = this.productsService
      .getProducts(this.page)
      .subscribe((data) => {
        this.products.push(...data);
        this.page++;
        this.isLoading = false;

        if (data.length < 9) this.isLast = true;
      });

    this.subscription.add(getProducts);
  }

  @HostListener('window:scroll')
  scrolling() {
    const scrolling = window.innerHeight + document.documentElement.scrollTop;
    const conditionScroll =
      scrolling >= (document.scrollingElement?.scrollHeight as number) - 300;

    if (conditionScroll && !this.isLoading && !this.isLast) {
      this.loadData();
    }
  }

  productSee(param: string, id: string) {
    this.subscription.add(
      this.productsMoreService
        .productsSee(param, localStorage.getItem('productId')!)
        .subscribe()
    );
    this.subscription.add(
      this.productsMoreService.productsSee(param, id).subscribe()
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
