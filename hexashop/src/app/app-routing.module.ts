import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { AdminAuthComponent } from './auth/admin-auth/admin-auth.component';
import { AuthComponent } from './auth/auth.component';
import { AuthGuardGuard } from './auth/guards/auth-guard.guard';
import { LoginPageComponent } from './auth/login-page/login-page.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { MainPageComponent } from './main-page/main-page.component';

const routes: Routes = [
  {
    path: '', redirectTo: '/main', pathMatch: 'full'
  },
  {
    path: '', component: MainPageComponent, children: [
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
      { path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },
    ]
  },
  {
    path: 'admin', component: AdminPanelComponent, canActivate: [AuthGuardGuard], children: [
      { path: 'dashboard', canActivate: [AuthGuardGuard], loadChildren: () => import('./admin-panel/pages/dashboard/dashboard.module').then(m => m.DashboardModule) },
      { path: 'users', canActivate: [AuthGuardGuard], loadChildren: () => import('./admin-panel/pages/users/users.module').then(m => m.UsersModule) },
      { path: 'category', canActivate: [AuthGuardGuard], loadChildren: () => import('./admin-panel/pages/category/category.module').then(m => m.CategoryModule) },
      { path: 'products', canActivate: [AuthGuardGuard], loadChildren: () => import('./admin-panel/pages/products/products.module').then(m => m.ProductsModule) },
    ]
  },
  { path: '**', component: ErrorPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
