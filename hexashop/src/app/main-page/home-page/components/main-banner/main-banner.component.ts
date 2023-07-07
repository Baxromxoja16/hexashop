import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Categories } from '../../home-page.component';
import { HomeService } from '../../services/home.service';

@Component({
  selector: 'app-main-banner',
  templateUrl: './main-banner.component.html',
  styleUrls: ['./main-banner.component.scss']
})
export class MainBannerComponent implements OnInit, OnDestroy {
  subscription$: Subscription = new Subscription();

  categories!: Categories;

  constructor(private homeService: HomeService, private router: Router) { }

  ngOnInit() {
    this.subscription$.add(
      this.homeService.getCategories().subscribe((val) => {
        this.categories = val;
      })
    )
  }

  onDiscoverMore(id: string) {
    this.subscription$.add(this.homeService.getClothes(id).subscribe());
    this.router.navigate(['/category']);
  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }
}
