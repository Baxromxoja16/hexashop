import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProductsComponent } from './products.component';
import { ProductsFormComponent } from './products-form/products-form.component';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', component: ProductsComponent },
      { path: 'new', component: ProductsFormComponent },
      { path: 'edit/:id', component: ProductsFormComponent },
      // { path: ':id', component: ProductsFormComponent },
    ])
  ]
})
export class ProductsModule { }
