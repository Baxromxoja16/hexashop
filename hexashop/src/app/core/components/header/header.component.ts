import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { HomeService } from 'src/app/main-page/home-page/services/home.service';
import { ProductsMoreService } from '../../services/products-more.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  subscription$: Subscription = new Subscription();

  countCarts = this.productsMoreService.cardData;

  constructor(private router: Router,
    private homeService: HomeService,
    private productsMoreService: ProductsMoreService,
  ) { }

  ngOnInit(): void {
  }

  cl() {
    // this.router.navigate(['/main'])
    
  }

  onDiscoverMore(id: string) {
    this.subscription$.add(this.homeService.getClothes(id).subscribe());
    this.router.navigate(['/category']);
  }

}
