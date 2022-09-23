import { DatePipe } from '@angular/common';
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
  @Input() selectedDate: Date = new Date()

  constructor(private rest: DashboardService) { }

  ngOnInit(): void {
    this.getConcludedOrders()
  }

  ngOnChanges() {
    this.getConcludedOrders()
  }

  getConcludedOrders() {
    var datePipe = new DatePipe('pt-BR');
    const date = datePipe.transform(this.selectedDate, "dd 'de' MMMM 'de' yyyy")
    this.rest.getConcludedOrders(date!).then((result) => {
      this.concludedOrders = result
    });
  }
}
