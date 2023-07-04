import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '', redirectTo: 'main', pathMatch: 'full'
  },
  {
    path: 'main', loadChildren: () => import('./home-page/home-page.module').then(m => m.HomePageModule)
  },
  {
    path: 'about', loadChildren: () => import('./about-page/about-page.module').then(m => m.AboutPageModule)
  },
  {
    path: 'contact', loadChildren: () => import('./contact-page/contact-page.module').then(m => m.ContactPageModule)
  },
  {
    path: 'products', loadChildren: () => import('./products-page/products-page.module').then(m => m.ProductsPageModule)
  },
  {
    path: 'category', loadChildren: () => import('./category-page/category.module').then(m => m.CategoryModule)
  },
  {
    path: 'single-product', loadChildren: () => import('./single-product-page/single-product-page.module').then(m => m.SingleProductPageModule)
  },
  {
    path: 'card', loadChildren: () => import('./cart-page/cart-page.module').then(m => m.CartPageModule)
  },
  {
    path: '**', redirectTo: 'error', pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
