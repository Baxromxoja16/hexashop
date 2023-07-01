import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-page-heading',
  templateUrl: './page-heading.component.html',
  styleUrls: ['./page-heading.component.scss']
})
export class PageHeadingComponent implements OnInit {
  @Input() title!: { title: string, text: string, about: boolean };

  constructor() {
  }

  ngOnInit(): void {
  }
}
