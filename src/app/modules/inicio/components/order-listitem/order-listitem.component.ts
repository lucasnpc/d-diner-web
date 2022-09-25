import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { MenuItem } from 'src/app/modules/cardapio/models/menu-item.model';
import { ItemRequest } from '../../models/OrderMenuItem.model';

@Component({
  selector: 'rp-order-listitem',
  templateUrl: './order-listitem.component.html',
  styleUrls: ['./order-listitem.component.less']
})
export class OrderListitemComponent implements OnInit {

  @Input() item: MenuItem | undefined
  itemQuantity: number = 0;
  _request: ItemRequest | undefined
  @Output() lessOrder = new EventEmitter<ItemRequest>()
  @Output() sumOrder = new EventEmitter<ItemRequest>();

  constructor() { }

  ngOnInit(): void {
    if (this.item!.itemQuantity != undefined) {
      for (let i = 1; i <= this.item!.itemQuantity; i++) {
        this.itemQuantity = i;
        this.sumOrder.emit({ itemId: this.item!.id, quantity: this.itemQuantity })
      }
    }
    else
      this.increaseItemQuantity()
  }

  lessItemQuantity() {
    if (this.itemQuantity > 0) {
      this.itemQuantity--
      this.emitOrder(false)
    }
  }

  increaseItemQuantity() {
    this.itemQuantity++
    this.emitOrder(true)
  }

  emitOrder(sum: boolean) {
    this._request = {
      itemId: this.item!.id,
      quantity: this.itemQuantity,
    }
    sum ? this.sumOrder.emit(this._request) : this.lessOrder.emit(this._request)
  }

}
