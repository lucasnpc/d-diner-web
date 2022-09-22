import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { KITCHEN_ROUTE } from 'src/app/core/utils/constants';
import { KitchenInfo } from 'src/app/modules/kitchen/models/KitchenInfo.model';
import { KitchenService } from 'src/app/modules/kitchen/services/kitchen.service';

@Component({
  selector: 'rp-total-orders',
  templateUrl: './orders-in-kitchen.component.html',
  styleUrls: ['./orders-in-kitchen.component.less'],
})
export class OrderInKitchenComponent implements OnInit {
  ordersAtKitchen: KitchenInfo[] = [];
  @Input() selectedDate: Date = new Date()

  constructor(private router: Router, private kitchenService: KitchenService) { }

  ngOnInit(): void {
    this.getTotalOrders()
  }

  ngOnChanges() {
    this.getTotalOrders()
  }

  getTotalOrders() {
    this.kitchenService.getSentClientOrders().then(result => {
      if (result)
        this.ordersAtKitchen = result
    })
  }

  showKitchen() {
    this.router.navigate([KITCHEN_ROUTE])
  }
}
