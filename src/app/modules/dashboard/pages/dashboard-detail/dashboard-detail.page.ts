import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { BusinessStorage } from 'src/app/core/utils/business-storage';
import { USER_INFO } from 'src/app/core/utils/constants';
import { InicioService } from 'src/app/modules/inicio/services/inicio.service';
import { InvoiceDialogComponent } from '../../components/invoice-dialog/invoice-dialog.component';
import { Order } from '../../models/order.model';
import { DashboardService } from '../../service/dashboard.service';

@Component({
  templateUrl: './dashboard-detail.page.html',
  styleUrls: ['./dashboard-detail.page.less'],
})
export class DashboardDetailPage implements OnInit {
  todayDate = new Date();
  totalOrders: Order[] = [];
  activeOrders: Order[] = [];
  concludedOrders: Order[] = [];
  userRole = ''

  constructor(private dashboardService: DashboardService, private storage: BusinessStorage, private snackBar: MatSnackBar,
    private dialog: MatDialog, private router: Router, private inicioService: InicioService) { }

  ngOnInit(): void {
    this.userRole = JSON.parse(this.storage.get(USER_INFO)).role
    this.getOrders()
  }

  getOrders() {
    if (this.userRole === 'Caixa') {
      this.dashboardService.getActiveOrders(this.storage.get("businessCnpj"), this.todayDate).subscribe((result) => {
        this.activeOrders = result.data;
      });
      return
    }
    this.dashboardService.getConcludedOrders(this.storage.get("businessCnpj"), this.todayDate).subscribe((result) => {
      this.concludedOrders = result.data;
    });
  }

  updateOrder(order: Order) {
    this.router.navigate(['/menu/inicio'], { state: { order: order } })
  }

  finishOrder(order: Order) {
    this.inicioService.getClientOrdersWithOrderId(order.orderId!.toString()).subscribe(r => {
      if (r)
        r.data.map(v => {
          this.inicioService.getItemsWithClientOrderId(v.clientOrderId).subscribe(r2 => {
            if (r2) {
              this.dialog.open(InvoiceDialogComponent, {
                data: r2.data
              }).afterClosed().subscribe(r3 => {
                if (r3)
                  this._updateOrderStatus(order.orderId)
              })
            }
          })
        })
    })
  }

  _updateOrderStatus(id: any) {
    this.dashboardService.updateActiveOrderToConcluded({ orderId: id }).subscribe(result => {
      if (result) {
        this.snackBar.open('Pedido Concluído com Sucesso!!!', undefined, {
          duration: 3000,
          panelClass: ['blue-snackbar']
        })
        this.getOrders()
      }
    })
  }
}
