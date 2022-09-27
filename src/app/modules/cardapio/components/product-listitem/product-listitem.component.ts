import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Product } from 'src/app/modules/compras/models/product.model';

@Component({
  selector: 'rp-product-listitem',
  templateUrl: './product-listitem.component.html',
  styleUrls: ['./product-listitem.component.less']
})
export class ProductListitemComponent implements OnInit {

  @Input() product: Product = {
    id: '',
    name: '',
    minimumStock: 0,
    currentStock: 0,
    measurementUnit: '',
    barcode: '',
    selected: false,
    menuItemQuantity: 0
  }
  productQuantity: number = 0;
  @Output() lessQuantity = new EventEmitter<Product>()
  @Output() sumQuantity = new EventEmitter<Product>();

  constructor() { }

  ngOnInit(): void { }

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
    if (this.product.menuItemQuantity > lessUnit) {
      this.product.menuItemQuantity -= Number(lessUnit)
      this.emitProductQuantity(false)
    }
  }

  increaseItemQuantity() {
    switch (this.product.measurementUnit) {
      case 'Unidade':
        this.product.menuItemQuantity = Number(this.product.menuItemQuantity) + Number(1);
        break;
      case 'Quilos':
        this.product.menuItemQuantity = Number(this.product.menuItemQuantity) + Number(0.5)
        break;
      case 'Gramas':
        this.product.menuItemQuantity = Number(this.product.menuItemQuantity) + Number(0.1)
        break;
      case 'Litros':
        this.product.menuItemQuantity = Number(this.product.menuItemQuantity) + Number(0.5)
        break;
    }
    this.emitProductQuantity(true)
  }

  emitProductQuantity(sum: boolean) {
    sum ? this.sumQuantity.emit(this.product) : this.lessQuantity.emit(this.product)
  }
}
