import { Component, Input, OnInit } from '@angular/core';
import { Order } from '../../models/order.model';
import { DashboardService } from '../../service/dashboard.service';

@Component({
  selector: 'rp-concluded-orders',
  templateUrl: './concluded-orders.component.html',
  styleUrls: ['./concluded-orders.component.less'],
})
export class ConcludedOrdersComponent implements OnInit {
  concludedOrders: Order[] = []
  @Input() selectedDate: Date = new Date()

  constructor(private rest: DashboardService) { }

  ngOnInit(): void {
    this.getConcludedOrders()
  }

  ngOnChanges() {
    this.getConcludedOrders()
  }

  getConcludedOrders() {
    this.rest.getConcludedOrders(this.selectedDate).then((result) => {
      this.concludedOrders = result
    });
  }
}
