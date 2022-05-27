import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BusinessStorage } from 'src/app/core/utils/business-storage';
import { BUSINESS_CNPJ, STATUS_PREPARED, STATUS_PREPARING } from 'src/app/core/utils/constants';
import { InicioService } from '../../services/inicio.service';
import { KitchenService } from '../../services/kitchen.service';
import { KitchenOrderDialogComponent } from '../kitchen-order-dialog/kitchen-order-dialog.component';

interface ClientOrder {
  clientOrderId: string;
  deskDescription: number;
  orderStatus: string;
}

@Component({
  selector: 'rp-kitchen-list',
  templateUrl: './kitchen-list.component.html',
  styleUrls: ['./kitchen-list.component.less']
})
export class KitchenListComponent implements OnInit {

  clientOrders: ClientOrder[] = []

  constructor(private kitchenService: KitchenService, private inicioService: InicioService, private dialog: MatDialog,
    private snackBar: MatSnackBar, private storage: BusinessStorage) { }

  ngOnInit(): void {
    this.getClientOrders()
  }

  seeOrderDetail(order: ClientOrder) {
    this.inicioService.getItemsWithClientOrderId(order.clientOrderId).subscribe(r => {
      if (r) {
        const dialogRef = this.dialog.open(KitchenOrderDialogComponent, {
          data: r.data
        })

        dialogRef.afterClosed().subscribe(r => {
          if (r)
            this.updateOrderStatus(order, STATUS_PREPARING)
        })
      }
    })
  }

  startOrderPreparing(order: ClientOrder) {
    this.updateOrderStatus(order, STATUS_PREPARING)
  }

  concludeOrderPreparing(order: ClientOrder) {
    this.updateOrderStatus(order, STATUS_PREPARED)
  }

  getClientOrders() {
    this.kitchenService.getSentClientOrders(this.storage.get(BUSINESS_CNPJ)).subscribe(result => {
      if (result) {
        this.clientOrders = result.data
      }
    })
  }

  updateOrderStatus(clientOrder: ClientOrder, status: string) {
    if (clientOrder.orderStatus === status) {
      alert('Pedido já está sendo preparado')
      return
    }

    var msg = () => { if (status === STATUS_PREPARED) { this.getClientOrders(); return 'Pedido Preparado!!! 🍕' } else return 'Pedido Iniciado!!! 🍕' }

    this.kitchenService.updateOrderStatus({ status: status, id: clientOrder.clientOrderId }).subscribe(r => {
      if (r) {
        this.snackBar.open(msg(), undefined, {
          duration: 3000,
          panelClass: ['blue-snackbar']
        })
      }
    })
  }
}
