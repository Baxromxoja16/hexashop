import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProductsComponent } from './products.component';
import { ProductsFormComponent } from './products-form/products-form.component';
import {ScrollingModule} from '@angular/cdk/scrolling';
import { ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from 'src/app/core/core.module';

@NgModule({
  declarations: [
    ProductsComponent,
    ProductsFormComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      { path: '', component: ProductsComponent },
      { path: 'new', component: ProductsFormComponent },
      { path: 'edit/:id', component: ProductsFormComponent },
      // { path: ':id', component: ProductsFormComponent },
    ]),
   CoreModule
  ]
})
export class ProductsModule { }
