import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BusinessStorage } from 'src/app/core/utils/business-storage';
import { STATUS_PREPARING, STATUS_PREPARED } from 'src/app/core/utils/constants';
import { KitchenInfo } from '../../models/KitchenInfo.model';
import { KitchenService } from '../../services/kitchen.service';

@Component({
  templateUrl: './kitchen.page.html',
  styleUrls: ['./kitchen.page.less']
})
export class KitchenPage implements OnInit {
  clientOrders: KitchenInfo[] = []

  constructor(private kitchenService: KitchenService, private dialog: MatDialog,
    private snackBar: MatSnackBar, private storage: BusinessStorage) { }

  ngOnInit(): void {
    this.getClientOrders()
  }

  seeOrderDetail(order: KitchenInfo) {
    // this.inicioService.getItemsWithClientOrderId(order.clientOrderId).subscribe(r => {
    //   if (r) {
    //     const dialogRef = this.dialog.open(KitchenOrderDialogComponent, {
    //       data: r.data
    //     })

    //     dialogRef.afterClosed().subscribe(r => {
    //       if (r)
    //         this.updateOrderStatus(order, STATUS_PREPARING)
    //     })
    //   }
    // })
  }

  startOrderPreparing(order: KitchenInfo) {
    this.updateOrderStatus(order, STATUS_PREPARING)
  }

  concludeOrderPreparing(order: KitchenInfo) {
    this.updateOrderStatus(order, STATUS_PREPARED)
  }

  getClientOrders() {
    this.kitchenService.getSentClientOrders().then(result => {
      if (result) {
        console.log(result);
        
        this.clientOrders = result
      }
    })
  }

  updateOrderStatus(clientOrder: KitchenInfo, status: string) {
    // if (clientOrder.orderStatus === status) {
    //   alert('Pedido já está sendo preparado')
    //   return
    // }

    var msg = () => { if (status === STATUS_PREPARED) { this.getClientOrders(); return 'Pedido Preparado!!! 🍕' } else return 'Pedido Iniciado!!! 🍕' }

    // this.kitchenService.updateOrderStatus({ status: status, id: clientOrder.clientOrderId }).subscribe(r => {
    //   if (r) {
    //     this.snackBar.open(msg(), undefined, {
    //       duration: 3000,
    //       panelClass: ['blue-snackbar']
    //     })
    //   }
    // })
  }
}
