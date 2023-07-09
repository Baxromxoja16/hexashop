import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { LoginPageComponent } from './auth/login-page/login-page.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { MainPageComponent } from './main-page/main-page.component';

const routes: Routes = [
  {
    path: '', redirectTo: '/main', pathMatch: 'full'
  },
  {
    path: '',  component: MainPageComponent, children: [
      {
        path: 'main', loadChildren: () => import('./main-page/home-page/home-page.module').then(m => m.HomePageModule)
      },
      {
        path: 'about', loadChildren: () => import('./about-page/about-page.module').then(m => m.AboutPageModule)
      },
      {
        path: 'contact', loadChildren: () => import('./contact-page/contact-page.module').then(m => m.ContactPageModule)
      },
      {
        path: 'products', loadChildren: () => import('./main-page/products-page/products-page.module').then(m => m.ProductsPageModule)
      },
      {
        path: 'category', loadChildren: () => import('./main-page/category-page/category.module').then(m => m.CategoryModule)
      },
      {
        path: 'single-product', loadChildren: () => import('./main-page/single-product-page/single-product-page.module').then(m => m.SingleProductPageModule)
      },
      {
        path: 'card', loadChildren: () => import('./main-page/cart-page/cart-page.module').then(m => m.CartPageModule)
      },
    ]
  },
  {
    path: '', component: AuthComponent, children: [
      { path: 'login', component: LoginPageComponent},
    ]
  },
  { path: '**', component: ErrorPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
