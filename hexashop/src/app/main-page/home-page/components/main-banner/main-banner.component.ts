import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LoadingSpinnerComponent } from 'src/app/core/components/loading-spinner/loading-spinner.component';
import { LoaderService } from 'src/app/core/services/loader.service';
import { Categories } from '../../home-page.component';
import { HomeService } from '../../services/home.service';

@Component({
  selector: 'app-main-banner',
  templateUrl: './main-banner.component.html',
  styleUrls: ['./main-banner.component.scss']
})
export class MainBannerComponent implements OnInit, OnDestroy {
  subscription$: Subscription = new Subscription();

  categories!: any;

  constructor(private homeService: HomeService, private router: Router, public loaderService: LoaderService) { }

  ngOnInit() {
    this.loaderService.setLoading(true);
    this.subscription$.add(
      this.homeService.getCategories().subscribe((val) => {
        this.categories = val;
        this.loaderService.setLoading(false);
      })
    );
  }

  onDiscoverMore(id: string) {
    this.subscription$.add(this.homeService.getClothes(id).subscribe());
    this.router.navigate(['/category']);
  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }
}
