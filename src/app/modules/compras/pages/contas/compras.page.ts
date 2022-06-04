import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BusinessStorage } from 'src/app/core/utils/business-storage';
import { BUSINESS_CNPJ } from 'src/app/core/utils/constants';
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
    this.service.getProducts(this.storage.get(BUSINESS_CNPJ)).subscribe(result => {
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
    // this.productsToSelect.map(p => {
    //   const index = this.products.findIndex(p2 => p2.productId == p.productId)
    //   if (this.productsToSelect[index].currentStock > this.products[index].currentStock)
    //     this.productRequest.push({
    //       productId: this.productsToSelect[index].productId!,
    //       productName: this.productsToSelect[index].productName,
    //       currentStock: this.products[index].currentStock
    //     })
    // })

    if (this.purchaseRequest.length == 0) {
      alert('Altere os produtos do estoque antes de concluir uma compra')
      return
    }

    const dialogRef = this.dialog.open(AddPurchaseDialogComponent, {
      data: this.purchaseRequest
    });

    dialogRef.afterClosed().subscribe(() => {
      this.getProducts()
      this.purchaseRequest = []
    });
  }
}