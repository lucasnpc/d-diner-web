import { Component, Input, OnInit } from '@angular/core';
import { BusinessStorage } from 'src/app/core/utils/business-storage';
import { Order } from '../../models/order.model';
import { DashboardService } from '../../service/dashboard.service';

@Component({
  selector: 'rp-total-orders',
  templateUrl: './total-orders.component.html',
  styleUrls: ['./total-orders.component.less'],
})
export class TotalOrdersComponent implements OnInit {
  totalOrders: Order[] = [];
  @Input() selectedDate: Date = new Date()

  constructor(private rest: DashboardService, private storage: BusinessStorage) { }

  ngOnInit(): void {
    this.getTotalOrders()
  }

  ngOnChanges() {
    this.getTotalOrders()
  }

  getTotalOrders() {
    this.rest.getTotalOrders(this.storage.get("businessCnpj"), this.selectedDate).subscribe((result) => {
      this.totalOrders = result.data;
    });
  }
}
