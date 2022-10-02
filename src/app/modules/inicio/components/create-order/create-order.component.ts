import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { BusinessStorage } from 'src/app/core/utils/business-storage';
import { MenuItem } from 'src/app/modules/cardapio/models/menu-item.model';
import { Order } from 'src/app/modules/dashboard/models/order.model';
import { SharedDialogComponent } from 'src/app/modules/shared/components/shared-dialog/shared-dialog.component';
import { ItemRequest } from '../../models/OrderMenuItem.model';
import { InicioService } from '../../services/inicio.service';

@Component({
  selector: 'rp-create-order',
  templateUrl: './create-order.component.html',
  styleUrls: ['./create-order.component.less']
})
export class CreateOrderComponent implements OnInit {
  @Input() index: number = 0;
  @Output() indexChanged = new EventEmitter<number>();
  @Input() createdOrder: any;
  @Input() orderToUpdate: Order | undefined

  createOrderControl = new FormControl('');
  items: MenuItem[] = []
  itemsDescription: string[] = [];
  filteredItems: Observable<string[]> = new Observable();
  selectedItems: MenuItem[] = []
  totalOrder = 0;
  itemRequest: ItemRequest[] = []

  constructor(private service: InicioService, private storage: BusinessStorage, private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.service.getItems(this.storage.get("businessCnpj")).subscribe(result => {
      this.items = result.data
      this.itemsDescription = this.items.map(item => item.description)

      this.filteredItems = this.createOrderControl.valueChanges.pipe(
        startWith(''),
        map(value => this._filter(value))
      )
    })

    if (this.orderToUpdate != undefined && this.createdOrder == undefined) {
      this.createdOrder = this.orderToUpdate
      this.service.getClientOrdersWithOrderId(this.orderToUpdate.orderId!.toString()).subscribe(result => {
        if (result)
          result.data.map(v => {
            this.service.getItemsWithClientOrderId(v.clientOrderId).subscribe(result => {
              if (result) {
                this.selectedItems = result.data
                // this.itemRequest = result.data.map(item => ({ itemId: item.id, quantity: item.itemQuantity }))
              }
            })
          })
      })
    }
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.itemsDescription.filter(item => item.toLowerCase().includes(filterValue));
  }

  createOrder() {
    if (this.selectedItems.length == 0 || this.totalOrder == 0) {
      alert('Impossível continuar para registro de pedido')
      return
    }
    const dialogRef = this.dialog.open(SharedDialogComponent, {
      // data: { name: this.createdOrder.deskDescription, type: ADD_ITEMS_TO_ORDER_KEY }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result)
        this.orderToUpdate === undefined ? this._postOrder() : this._updateOrder()
    })
  }

  cancelAttendance(cancelOrder: boolean) {

    if (cancelOrder) {
      const dialogRef = this.dialog.open(SharedDialogComponent, {
        // data: { name: 'Deseja cancelar o pedido?', type: DELETE_ORDER_KEY }
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          console.log('delete order');
          this.index = 0;
          this.indexChanged.emit(this.index)
        }
      })
    }
    else {
      this.index = 0;
      this.indexChanged.emit(this.index)
    }
  }

  setItem(i: string) {
    this.createOrderControl.setValue('', { emitEvent: true })

    // verifica se o item já esta na lista de items 
    if (this.selectedItems.some(item => item.description === i)) {
      alert("Este item já esta na lista")
      return
    }

    const item = this.items.find(item => item.description === i)
    if (!item) {
      return
    }

    this.selectedItems.push(item)
    // this.itemRequest.push({ itemId: item.id, quantity: 1 })

  }

  sumOrder(order: ItemRequest) {
    // this.selectedItems.map(value => value.id == order.itemId ? this.totalOrder += Number(value.price) : undefined)
    this._changeQuantity(order)
  }

  lessOrder(order: ItemRequest) {
    // this.selectedItems.map(value => value.id == order.itemId ? this.totalOrder -= Number(value.price) : undefined)
    this._changeQuantity(order)
  }

  _changeQuantity(order: ItemRequest) {
    const itemIndex = this.itemRequest.findIndex(item => item.itemId === order.itemId)
    if (itemIndex < 0) {
      return
    }

    this.itemRequest[itemIndex].quantity = order.quantity
  }

  _postOrder() {
    // this.service.postClientOrder({ orderId: this.createdOrder.orderId, clientOrder: undefined }).subscribe(result => {
    //   if (result.success) {
    //     this.itemRequest.map(value => {
    //       this.service.postClientOrdersItems({
    //         clientOrderId: result.id,
    //         itemId: value.itemId,
    //         itemQuantity: value.quantity,
    //         orderStatus: STATUS_STARTING
    //       }).subscribe(r2 => {
    //         if (r2.success)
    //           this.cancelAttendance(false)
    //       })
    //     })
    //   }
    // })
  }

  _updateOrder() {
    this.service.updateOrderMenuItems({
      orderId: this.orderToUpdate!.orderId,
      items: this.itemRequest,
    }).subscribe(result => {
      if (result.success)
        this.cancelAttendance(false)
    })
  }
}
