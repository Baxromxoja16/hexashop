import { Component } from '@angular/core';
import { LoaderService } from '../core/services/loader.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent {
  constructor(public loaderService: LoaderService){}
}
