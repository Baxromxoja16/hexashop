import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription, race } from 'rxjs';
import { Product, Products } from 'src/app/core/models/products.model';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit, OnDestroy {
  subscription: Subscription = new Subscription();

  products: Products[] = [];

  page = 1;
  isLoading: boolean = false;

  isLast = false;

  constructor(
    private productsService: ProductsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.isLoading = true;
    const getProducts = this.productsService
      .getProducts(this.page)
      .subscribe((data) => {
        this.products.push(...data)
        this.page++;
        this.isLoading = false

        if(data.length < 9) this.isLast = true;
      });

    this.subscription.add(getProducts);
  }

  @HostListener('window:scroll') 
    scrolling() {
      const scrolling = window.innerHeight + document.documentElement.scrollTop;
      const conditionScroll = scrolling >= (document.scrollingElement?.scrollHeight as number);

      if (conditionScroll && !this.isLoading && !this.isLast) {
        this.loadData()
      }
    }

  settings(mode: string, id: string, index: number = 0) {
    if (mode === 'edit') {
      this.router.navigate(['/admin/products/' + 'edit/' + id]);
    } else if (mode === 'del') {
      this.products.splice(index, 1);
      this.subscription.add(
        this.productsService.deleteProduct(id).subscribe(() => {
          this.router.navigate(['/admin/products/']);
        })
      );
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
