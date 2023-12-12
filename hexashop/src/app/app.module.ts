import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './main-page/home-page/home-page.component';
import { AboutPageComponent } from './about-page/about-page.component';
import { ContactPageComponent } from './contact-page/contact-page.component';
import { ProductsPageComponent } from './main-page/products-page/products-page.component';
import { SingleProductPageComponent } from './main-page/single-product-page/single-product-page.component';
import { MainBannerComponent } from './main-page/home-page/components/main-banner/main-banner.component';
import { ExploreComponent } from './main-page/home-page/components/explore/explore.component';
import { AboutAreaComponent } from './about-page/components/about-area/about-area.component';
import { OurTeamComponent } from './about-page/components/our-team/our-team.component';
import { ContactUsComponent } from './contact-page/components/contact-us/contact-us.component';
import { CartPageComponent } from './main-page/cart-page/cart-page.component';
import { HttpClientModule } from '@angular/common/http';
import { CategoryPageComponent } from './main-page/category-page/category-page.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginPageComponent } from './auth/login-page/login-page.component';
import { AuthComponent } from './auth/auth.component';
import { MainPageComponent } from './main-page/main-page.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { ClickOutDirective } from './core/directives/click-out.directive';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { AdminPanelModule } from "./admin-panel/admin-panel.module";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from './core/core.module';
import { HeaderComponent } from './core/components/header/header.component';

@NgModule({
    declarations: [
        AppComponent,
        HomePageComponent,
        AboutPageComponent,
        ContactPageComponent,
        ProductsPageComponent,
        SingleProductPageComponent,
        MainBannerComponent,
        ExploreComponent,
        AboutAreaComponent,
        OurTeamComponent,
        ContactUsComponent,
        CartPageComponent,
        CategoryPageComponent,
        LoginPageComponent,
        AuthComponent,
        MainPageComponent,
        ErrorPageComponent,
        HeaderComponent,
        ClickOutDirective,
        AdminPanelComponent,
    ],
    providers: [],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        HttpClientModule,
        AppRoutingModule,
        ReactiveFormsModule,
        AdminPanelModule,
        // BrowserAnimationsModule,
        CoreModule,
    ]
})
export class AppModule { }
