import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Product, Products } from 'src/app/core/models/products.model';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit, OnDestroy {
  subscription: Subscription = new Subscription();

  products!: Products[]

  constructor(private productsService: ProductsService, private router: Router) { }

  ngOnInit(): void {
    this.subscription.add(this.productsService.getProducts().subscribe(data => {
      this.products = data;
    }))
  }

  settings(mode: string, id: string) {
    if (mode === 'edit') {
      this.router.navigate(['/admin/products/' + 'edit/' + id])
    } else if (mode === 'del') {
      this.subscription.add(this.productsService.deleteProduct(id).subscribe(() => {
        this.router.navigate(['/admin/products/']);
      }));
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }
}
