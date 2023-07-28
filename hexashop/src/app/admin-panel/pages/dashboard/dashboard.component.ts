import { Component, OnInit } from '@angular/core';
import { StatisticsService } from '../../services/statistics.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private statiticsService: StatisticsService) { }

  ngOnInit(): void {
    this.statiticsService.getStatistics().subscribe(data => {
      console.log(data);
    })
  }
}
