import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Categories } from '../../home-page.component';
import { HomeService } from '../../services/home.service';

@Component({
  selector: 'app-main-banner',
  templateUrl: './main-banner.component.html',
  styleUrls: ['./main-banner.component.scss']
})
export class MainBannerComponent implements OnInit {
  subscription$: Subscription = new Subscription();

  categories!: Categories;

  constructor(private homeService: HomeService) { }

  ngOnInit() {
    this.subscription$.add(
      this.homeService.getCategories().subscribe((val) => {
        this.categories = val;
        console.log(this.categories);
      })
    )
  }

}
