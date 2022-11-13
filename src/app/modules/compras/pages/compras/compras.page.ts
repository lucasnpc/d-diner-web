import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddProductDialog } from '../../components/add-product-dialog/add-product-dialog.component';
import { Product } from '../../models/product.model';
import { ComprasService } from '../../service/compras.service';
import { AddPurchaseDialogComponent } from '../../components/add-purchase-dialog/add-purchase-dialog.component';
import { SharedDialogComponent } from 'src/app/modules/shared/components/shared-dialog/shared-dialog.component';

@Component({
  templateUrl: './compras.page.html',
  styleUrls: ['./compras.page.less'],
})
export class ComprasPage implements OnInit {
  products: Product[] = [];

  constructor(private dialog: MatDialog, private service: ComprasService) { }

  ngOnInit(): void {
    this.getProducts()
  }

  openDialog(edit: boolean) {
    const product = this.products.filter(product => product.selected)
    if (product.length > 1 && edit) {
      alert('Você pode alterar apenas um produto por vez')
      return
    }
    var dialogRef
    if (edit === true) {
      dialogRef = this.dialog.open(AddProductDialog, {
        data: ({
          id: product[0].id,
          name: product[0].name,
          minimumStock: product[0].minimumStock,
          currentStock: product[0].currentStock,
          measurementUnit: product[0].measurementUnit,
          barcode: product[0].barcode,
          selected: product[0].selected,
          menuItemQuantity: product[0].menuItemQuantity,
        })
      });
    }
    else {
      dialogRef = this.dialog.open(AddProductDialog, {
        data: {}
      });
    }

    dialogRef.afterClosed()
  }

  getProducts() {
    this.service.getProducts().subscribe(result => {
      if (result) {
        this.products = result
      }
    })
  }

  concludePurchase() {
    const productsToPurchase = this.products.filter(product => product.selected)
    if (productsToPurchase.length == 0) {
      alert('Altere os produtos do estoque antes de concluir uma compra')
      return
    }

    const dialogRef = this.dialog.open(AddPurchaseDialogComponent, {
      data: productsToPurchase
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result)
        alert('Compras registradas com sucesso!')
    });
  }

  openExclusionDialog() {
    const product = this.products.filter(product => product.selected)
    if (product.length > 1) {
      alert('Você pode alterar apenas um produto por vez')
      return
    }

    const dialogRef = this.dialog.open(SharedDialogComponent)

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.service.deleteProduct(product[0])
      }
    })
  }
}