import { Component, Input, OnInit } from '@angular/core';
import { BusinessStorage } from 'src/app/core/utils/business-storage';
import { Order } from '../../models/order.model';
import { DashboardService } from '../../service/dashboard.service';

@Component({
  selector: 'rp-active-orders',
  templateUrl: './active-orders.component.html',
  styleUrls: ['./active-orders.component.less']
})
export class ActiveOrdersComponent implements OnInit {
  activeOrders: Order[] = []
  @Input() selectedDate: Date

  constructor(private rest: DashboardService, private storage: BusinessStorage) { }

  ngOnInit(): void {
    this.getActiveOrders()
  }

  ngOnChages() {
    this.getActiveOrders()
  }

  getActiveOrders() {
    this.rest.getActiveOrders(this.storage.get("businessCnpj"), this.selectedDate).subscribe((result) => {
      this.activeOrders = result.data;
    });
  }

}
