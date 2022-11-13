import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MenuItem } from 'src/app/modules/cardapio/models/menu-item.model';
import { MenuService } from 'src/app/modules/cardapio/service/menu.service';
import { OrderedItems } from 'src/app/modules/kitchen/models/OrderedItems.model';
import { Desk } from '../../model/desk.model';
import { DesksService } from '../../service/desk-service.service';
import { InvoiceDialogComponent } from '../invoice-dialog/invoice-dialog.component';

@Component({
  selector: 'app-desk-data-dialog',
  templateUrl: './desk-data-dialog.component.html',
  styleUrls: ['./desk-data-dialog.component.less']
})
export class DeskDataDialogComponent implements OnInit {

  desk: Desk = {
    id: '',
    description: '',
    isOccupied: false
  }
  orderId = ''
  startHour = ''
  items: MenuItem[] = []
  orderedItems: OrderedItems[] = []

  constructor(@Inject(MAT_DIALOG_DATA) public data: Desk, private service: DesksService, private dialog: MatDialog, menuService: MenuService) {
    menuService.getItems().subscribe(r => this.items = r)
  }

  ngOnInit(): void {
    this.desk = this.data
    this.getDeskInfo()
  }

  getDeskInfo() {
    this.service.getDeskInfo(this.desk.id).subscribe(result => {
      this.orderId = result.docs[0].id
      this.startHour = result.docs[0].data()['startHour']
      this.getOrderedItems()
    })
  }

  getOrderedItems() {
    this.service.getOrderedItems(this.desk.id, this.orderId).subscribe(r => {
      r.docs.forEach(doc => {
        this.orderedItems.push({
          id: doc.id,
          observations: doc.data()['observations'],
          placedItems: doc.data()['placedItems'],
          status: doc.data()['status']
        })
      })
    })
  }

  effectPayment() {
    var _items: MenuItem[] = []
    this.orderedItems.forEach(i => {
      Object.entries(i.placedItems).forEach(([key, value]) => {
        const item = this.items.find(index => index.id == key)
        if (item) {
          _items.push({
            id: item?.id,
            category: item?.category,
            description: item?.description,
            price: item?.price,
            itemQuantity: value,
            selected: false
          })
        }
      })
    })

    if (_items.length == 0)
      return

    this.dialog.open(InvoiceDialogComponent, {
      data: { items: _items, orderId: this.orderId }
    }).afterClosed().subscribe(r => {
      if (r) {
        this.service.concludeOrder(this.desk.id, this.orderId)
        this.service.disoccupyDesk(this.desk.id)
      }
    })
  }
}
