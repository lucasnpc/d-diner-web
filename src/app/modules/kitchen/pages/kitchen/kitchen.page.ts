import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { STATUS_PREPARED } from 'src/app/core/utils/constants';
import { MenuItem } from 'src/app/modules/cardapio/models/menu-item.model';
import { MenuService } from 'src/app/modules/cardapio/service/menu.service';
import { KitchenInfo } from '../../models/KitchenInfo.model';
import { MenuItemInfo } from '../../models/MenuItemInfo.model';
import { KitchenService } from '../../services/kitchen.service';

@Component({
  templateUrl: './kitchen.page.html',
  styleUrls: ['./kitchen.page.less']
})
export class KitchenPage implements OnInit {
  clientOrders: KitchenInfo[] = []
  menuItems: MenuItem[] = []

  constructor(private kitchenService: KitchenService, private snackBar: MatSnackBar, private menuService: MenuService) { }

  ngOnInit(): void {
    this.getClientOrders()
    this.getMenuItems();
  }

  getMenuItems() {
    this.menuService.getItems().subscribe(r => {
      this.menuItems = r
    })
  }

  getItemInfo(info: KitchenInfo) {
    var itemInfo: MenuItemInfo[] = []
    Object.keys(info.placedItems).forEach(key => {
      this.menuItems.map(item => {
        if (item.id == key)
          itemInfo.push({
            id: item.id,
            description: item.description,
            price: item.price,
            quantity: info.placedItems[key]
          })
      })
    })
    return itemInfo
  }

  concludeOrderPreparing(order: KitchenInfo) {
    this.updateOrderStatus(order, STATUS_PREPARED)
  }

  getClientOrders() {
    this.kitchenService.getSentClientOrders().then(result => {
      if (result)
        this.clientOrders = result
    })
  }

  updateOrderStatus(order: KitchenInfo, status: string) {
    if (order.status === status) {
      alert('Pedido já está sendo preparado')
      return
    }

    var msg = () => { if (status === STATUS_PREPARED) { return 'Pedido Preparado!!! 🍕' } else return 'Pedido Iniciado!!! 🍕' }

    this.kitchenService.updateOrderStatus(order, status).then(() => {
      this.snackBar.open(msg(), undefined, {
        duration: 3000,
        panelClass: ['blue-snackbar']
      })
    })
  }
}
