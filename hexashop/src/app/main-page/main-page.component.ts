import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent  implements OnInit {

  ngOnInit(): void {
    alert('При первом посещении данные будут отображаться немного медленнее, пожалуйста, подождите немного');
  }
}
