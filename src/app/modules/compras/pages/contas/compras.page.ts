import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BusinessStorage } from 'src/app/core/utils/business-storage';
import { BUSINESS_CNPJ } from 'src/app/core/utils/constants';
import { AddProductDialog } from '../../components/add-product-dialog/add-product-dialog.component';
import { Product } from '../../models/product.model';
import { ComprasService } from '../../service/compras.service';
import { deepCopy } from '@angular-devkit/core/src/utils/object';
import { AddPurchaseDialogComponent } from '../../components/add-purchase-dialog/add-purchase-dialog.component';


interface ProductRequest {
  productId: number,
  productName: string,
  quantity: number,
  totalCostValue: number;
  currentStock: number;
}

const formatter = new Intl.NumberFormat('en-US', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

@Component({
  templateUrl: './compras.page.html',
  styleUrls: ['./compras.page.less'],
})
export class ComprasPage implements OnInit {
  products: Product[] = [];
  productsToSelect: Product[] = [];
  productRequest: ProductRequest[] = [];

  constructor(private dialog: MatDialog, private service: ComprasService, private storage: BusinessStorage) { }

  ngOnInit(): void {
    this.getProducts()
  }

  openDialog() {
    const dialogRef = this.dialog.open(AddProductDialog);

    dialogRef.afterClosed().subscribe(result => {
      if (result)
        this.getProducts()
    });
  }

  getProducts() {
    this.service.getProducts(this.storage.get(BUSINESS_CNPJ)).subscribe(result => {
      if (result) {
        this.products = result.data
        this.productsToSelect = deepCopy(this.products)
      }
    })
  }

  changeColor(item: Product) {
    this.productsToSelect.find(p => p.selected === true ? p.selected = false : undefined)
    item.selected = true
  }

  lessProductQuantity(product: Product) {
    const p = this.products.find(p => product.productId === p.productId)
    if (Number(product.currentStock) <= Number(p.currentStock))
      return
    switch (product.measurementUnit) {
      case 'Unidade':
        product.currentStock -= Number(1);
        break;
      case 'Quilos':
        product.currentStock -= Number(0.5)
        break;
      case 'Gramas':
        product.currentStock -= Number(0.1)
        break;
      case 'Litros':
        product.currentStock -= Number(0.5)
        break
    }
  }

  increaseProductQuantity(product: Product) {
    const p = this.products.find(p => product.productId === p.productId)
    if (Number(product.currentStock) >= Number(p.maximumStock))
      return
    switch (product.measurementUnit) {
      case 'Unidade':
        product.currentStock = Number(product.currentStock) + Number(1);
        break;
      case 'Quilos':
        product.currentStock = Number(product.currentStock) + Number(0.5)
        break;
      case 'Gramas':
        product.currentStock = Number(product.currentStock) + Number(0.1)
        break;
      case 'Litros':
        product.currentStock = Number(product.currentStock) + Number(0.5)
        break;
    }
  }

  concludePurchase() {
    this.productsToSelect.map(p => {
      const index = this.products.findIndex(p2 => p2.productId == p.productId)
      const quantityPurchased = Number(formatter.format(this.productsToSelect[index].currentStock - this.products[index].currentStock))
      if (this.productsToSelect[index].currentStock > this.products[index].currentStock)
        this.productRequest.push({
          productId: this.productsToSelect[index].productId,
          productName: this.productsToSelect[index].productName,
          quantity: quantityPurchased,
          totalCostValue: this.productsToSelect[index].costValue * quantityPurchased,
          currentStock: this.products[index].currentStock
        })
    })

    if (this.productRequest.length == 0) {
      alert('Altere os produtos do estoque antes de concluir uma compra')
      return
    }

    const dialogRef = this.dialog.open(AddPurchaseDialogComponent, {
      data: this.productRequest
    });

    dialogRef.afterClosed().subscribe(() => {
      this.getProducts()
      this.productRequest = []
    });
  }
}