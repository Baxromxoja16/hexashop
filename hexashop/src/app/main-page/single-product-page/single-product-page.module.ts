import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SingleProductPageComponent } from './single-product-page.component';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path: '', component: SingleProductPageComponent}
    ])
  ]
})
export class SingleProductPageModule { }
