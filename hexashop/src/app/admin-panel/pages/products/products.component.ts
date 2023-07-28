import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Products } from 'src/app/core/models/products.model';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit, OnDestroy {
  subscription: Subscription = new Subscription();

  products!: Products[]

  constructor(private productsService: ProductsService) { }

  ngOnInit(): void {
    this.subscription.add(this.productsService.getProducts().subscribe(data => {
      console.log(data);
      this.products = data;
    }))
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }
}
