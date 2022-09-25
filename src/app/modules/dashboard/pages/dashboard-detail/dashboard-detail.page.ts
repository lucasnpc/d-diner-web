import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Order } from '../../models/order.model';
import { DashboardService } from '../../service/dashboard.service';

@Component({
  templateUrl: './dashboard-detail.page.html',
  styleUrls: ['./dashboard-detail.page.less'],
})
export class DashboardDetailPage implements OnInit {
  selectedDate = new Date();
  concludedOrders: Order[] = [];

  constructor(private dashboardService: DashboardService, private router: Router) { }

  ngOnInit(): void {
    if (history.state.date)
      this.selectedDate = history.state.date
    this.getOrders()
  }

  getOrders() {
    this.dashboardService.getConcludedOrders(this.selectedDate).then(result => {
      this.concludedOrders = result;
    });
  }
}
