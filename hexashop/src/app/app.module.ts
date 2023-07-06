import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './home-page/home-page.component';
import { AboutPageComponent } from './about-page/about-page.component';
import { ContactPageComponent } from './contact-page/contact-page.component';
import { ProductsPageComponent } from './products-page/products-page.component';
import { SingleProductPageComponent } from './single-product-page/single-product-page.component';
import { FooterComponent } from './core/components/footer/footer.component';
import { HeaderComponent } from './core/components/header/header.component';
import { MainBannerComponent } from './home-page/components/main-banner/main-banner.component';
import { ExploreComponent } from './home-page/components/explore/explore.component';
import { SubscribeComponent } from './core/components/subscribe/subscribe.component';
import { PageHeadingComponent } from './core/components/page-heading/page-heading.component';
import { AboutAreaComponent } from './about-page/components/about-area/about-area.component';
import { OurTeamComponent } from './about-page/components/our-team/our-team.component';
import { ContactUsComponent } from './contact-page/components/contact-us/contact-us.component';
import { CartPageComponent } from './cart-page/cart-page.component';
import { HttpClientModule } from '@angular/common/http';
import { CategoryPageComponent } from './category-page/category-page.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    AboutPageComponent,
    ContactPageComponent,
    ProductsPageComponent,
    SingleProductPageComponent,
    FooterComponent,
    HeaderComponent,
    MainBannerComponent,
    ExploreComponent,
    SubscribeComponent,
    PageHeadingComponent,
    AboutAreaComponent,
    OurTeamComponent,
    ContactUsComponent,
    CartPageComponent,
    CategoryPageComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
