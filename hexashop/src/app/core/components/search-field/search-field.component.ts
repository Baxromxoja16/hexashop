import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Products } from '../../models/products.model';
import { ProductsMoreService } from '../../services/products-more.service';
import { SearchService } from '../../services/search.service';

@Component({
  selector: 'app-search-field',
  templateUrl: './search-field.component.html',
  styleUrls: ['./search-field.component.scss']
})
export class SearchFieldComponent implements OnInit, OnDestroy {
  isLogin = this.authService.isLogin;

  phone = JSON.parse(localStorage.getItem('phone')!);

  subscription$: Subscription = new Subscription();

  openResultField = false;

  createForm = new FormGroup({
    search: new FormControl('')
  })

  searchResult: Products[] = []

  constructor(
    private authService: AuthService,
    private router: Router,
    private searchService: SearchService,
    private productsMoreService: ProductsMoreService) { }

  ngOnInit(): void {
    this.createForm.valueChanges.subscribe((value) => {
      this.searchResultObs()
    })
  }

  searching() {
    this.searchResultObs();
  }

  private searchResultObs() {
    let search = this.createForm.value.search || '';
    return this.subscription$.add(this.searchService.searchProduct(search).subscribe((data) => {
      this.openResultField = true;
      this.searchResult = data;
    }));
  }


  logIn() {
    if (!this.isLogin.value) {
      this.router.navigate(['/login'])
    }

    this.authService.logout();
  }

  view(param: string, id: string) {
    this.subscription$.add(this.productsMoreService.productsSee(param, localStorage.getItem('productId')!).subscribe());
    this.subscription$.add(this.productsMoreService.productsSee(param, id).subscribe());
  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }
}
