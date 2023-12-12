import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { PageHeadingComponent } from './components/page-heading/page-heading.component';
import { SearchFieldComponent } from './components/search-field/search-field.component';
import { SubscribeComponent } from './components/subscribe/subscribe.component';

@NgModule({
  declarations: [
    FooterComponent,
    LoadingSpinnerComponent,
    PageHeadingComponent,
    SearchFieldComponent,
    SubscribeComponent,
  ],
  imports: [CommonModule, ReactiveFormsModule],
  exports: [
    FooterComponent,
    LoadingSpinnerComponent,
    PageHeadingComponent,
    SearchFieldComponent,
    SubscribeComponent,
  ],
})
export class CoreModule {}
