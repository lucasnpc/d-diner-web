import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BusinessStorage } from 'src/app/core/utils/business-storage';
import { USER_INFO } from 'src/app/core/utils/constants';
import { AddProductDialog } from '../../components/add-product-dialog/add-product-dialog.component';
import { Product } from '../../models/product.model';
import { ComprasService } from '../../service/compras.service';
import { deepCopy } from '@angular-devkit/core/src/utils/object';
import { AddPurchaseDialogComponent } from '../../components/add-purchase-dialog/add-purchase-dialog.component';
import { PurchaseRequest } from '../../models/purchaseRequest.model';

@Component({
  templateUrl: './compras.page.html',
  styleUrls: ['./compras.page.less'],
})
export class ComprasPage implements OnInit {
  products: Product[] = [];
  productsToSelect: Product[] = [];
  purchaseRequest: PurchaseRequest[] = [];

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
    this.service.getProducts(JSON.parse(this.storage.get(USER_INFO)).businessCnpj).subscribe(result => {
      if (result) {
        this.products = result.data
        this.productsToSelect = deepCopy(this.products)
      }
    })
  }

  changeColor(item: Product) {
    const index = this.purchaseRequest.findIndex(p => p.productId === item.productId)
    if (index > -1) {
      this.purchaseRequest.splice(index, 1)
      item.selected = false
      return
    }
    this.purchaseRequest.push({ productId: item.productId, productName: item.productName, currentStock: item.currentStock })
    item.selected = true
  }

  concludePurchase() {
    if (this.purchaseRequest.length == 0) {
      alert('Altere os produtos do estoque antes de concluir uma compra')
      return
    }

    const dialogRef = this.dialog.open(AddPurchaseDialogComponent, {
      data: this.purchaseRequest
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result)
        alert('Compras registradas com sucesso!')
      this.getProducts()
      this.purchaseRequest = []
    });
  }
}