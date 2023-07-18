import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AdminPanelComponent } from './admin-panel.component';
import { AdminSidebarComponent } from './components/admin-sidebar/admin-sidebar.component';
import { AdminHeaderComponent } from './components/admin-header/admin-header.component';
import { AdminFooterComponent } from './components/admin-footer/admin-footer.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { CategoryComponent } from './pages/category/category.component';
import { UsersComponent } from './pages/users/users.component';
import { ProductsComponent } from './pages/products/products.component';


@NgModule({
  declarations: [
    AdminSidebarComponent,
    AdminHeaderComponent,
    AdminFooterComponent,
    DashboardComponent,
    CategoryComponent,
    UsersComponent,
    ProductsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '', component: AdminPanelComponent
      }
    ])
  ],
  exports: [
    AdminSidebarComponent,
    AdminHeaderComponent,
    AdminFooterComponent
  ]
})
export class AdminPanelModule { }
