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

  page = 1; // Initial page number
  isLoading: boolean = false; // is a boolean flag to track whether new items are being loaded.

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
        this.products = [...this.products, ...data];
        this.page++;
        this.isLoading = false
      });

    this.subscription.add(getProducts);
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
