import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Product } from 'src/app/modules/compras/models/product.model';
import { ProductRequest } from '../../models/menu-item-product.model';

@Component({
  selector: 'rp-product-listitem',
  templateUrl: './product-listitem.component.html',
  styleUrls: ['./product-listitem.component.less']
})
export class ProductListitemComponent implements OnInit {

  @Input() product: Product
  productQuantity: number = 0;
  _request: ProductRequest = new ProductRequest()
  @Output() lessQuantity = new EventEmitter<ProductRequest>()
  @Output() sumQuantity = new EventEmitter<ProductRequest>();

  constructor() { }

  ngOnInit(): void {
    this.increaseItemQuantity()
  }

  lessItemQuantity() {
    var lessUnit = 0;
    switch (this.product.measurementUnit) {
      case 'Unidade':
        lessUnit = 1;
        break;
      case 'Quilos':
        lessUnit = 0.5
        break;
      case 'Gramas':
        lessUnit = 0.1
        break;
      case 'Litros':
        lessUnit = 0.5
        break
    }
    if (this.productQuantity > lessUnit) {
      this.productQuantity -= Number(lessUnit)
      this.emitProductQuantity(false)
    }
  }

  increaseItemQuantity() {
    switch (this.product.measurementUnit) {
      case 'Unidade':
        this.productQuantity = Number(this.productQuantity) + Number(1);
        break;
      case 'Quilos':
        this.productQuantity = Number(this.productQuantity) + Number(0.5)
        break;
      case 'Gramas':
        this.productQuantity = Number(this.productQuantity) + Number(0.1)
        break;
      case 'Litros':
        this.productQuantity = Number(this.productQuantity) + Number(0.5)
        break;
    }
    this.emitProductQuantity(true)
  }

  emitProductQuantity(sum: boolean) {
    this._request = {
      productId: this.product.productId,
      quantity: this.productQuantity,
    }
    sum ? this.sumQuantity.emit(this._request) : this.lessQuantity.emit(this._request)
  }
}
