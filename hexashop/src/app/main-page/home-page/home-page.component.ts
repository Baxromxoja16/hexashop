import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { HomeService } from './services/home.service';

interface Category { id: string, name: string, image: string }

export interface Categories {
  id: string;
  name: string;
  subCategories: Category[]
}

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit, OnDestroy {

  subscription$: Subscription = new Subscription();

  categories!: Categories;

  constructor(private homeService: HomeService) { }

  ngOnInit(): void {
    // this.subscription$.add(
    //   this.homeService.getCategories().subscribe((val) => {
    //     this.categories = val;
    //   })
    // )
    alert('При первом посещении данные будут отображаться немного медленнее, пожалуйста, подождите немного');
  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }

}
