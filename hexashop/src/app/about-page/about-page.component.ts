import { Component } from '@angular/core';

export interface Title {
  title: string;
  text: string;
}

@Component({
  selector: 'app-about-page',
  templateUrl: './about-page.component.html',
  styleUrls: ['./about-page.component.scss']
})
export class AboutPageComponent {
  title = { title: 'About Our Company', text: 'Learn more about us', about: true }

}
