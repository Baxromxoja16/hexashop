import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Products } from '../core/models/products';
import { ProductsMoreService } from '../core/services/products-more.service';

@Component({
  selector: 'app-single-product-page',
  templateUrl: './single-product-page.component.html',
  styleUrls: ['./single-product-page.component.scss']
})
export class SingleProductPageComponent implements OnInit{
  title = { title: 'Products', text: 'Learn more about us', about: false }

  product$!: Observable<Products>;

  constructor(private productsMoreService: ProductsMoreService){}

  ngOnInit(): void {
    this.product$ = this.productsMoreService.productsSee('more', localStorage.getItem('productId')!);
  }

}
