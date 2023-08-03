import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { StatisticsService } from '../../services/statistics.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {

  subscription: Subscription = new Subscription();

  constructor(private statiticsService: StatisticsService) { }

  ngOnInit(): void {
    this.subscription.add(this.statiticsService.getStatistics().subscribe(data => {
      console.log(data);
    }))
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }
}
