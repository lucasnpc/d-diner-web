import { Component, Input, OnInit } from '@angular/core';
import { BusinessStorage } from 'src/app/core/utils/business-storage';
import { Order } from '../../models/order.model';
import { DashboardService } from '../../service/dashboard.service';

@Component({
  selector: 'rp-concluded-orders',
  templateUrl: './concluded-orders.component.html',
  styleUrls: ['./concluded-orders.component.less'],
})
export class ConcludedOrdersComponent implements OnInit {
  concludedOrders: Order[] = []
  @Input() selectedDate: Date

  constructor(private rest: DashboardService, private storage: BusinessStorage) { }

  ngOnInit(): void {
    this.getConcludedOrders()
  }

  ngOnChanges() {
    this.getConcludedOrders()
  }

  getConcludedOrders() {
    this.rest.getConcludedOrders(this.storage.get("businessCnpj"), this.selectedDate).subscribe((result) => {
      this.concludedOrders = result.data;
    });
  }
}
