import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'hexashop';

  ngOnInit(): void {
    alert('При первом посещении данные будут отображаться немного медленнее, пожалуйста, подождите немного');
  }
}
