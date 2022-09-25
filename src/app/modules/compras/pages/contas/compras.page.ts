import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddProductDialog } from '../../components/add-product-dialog/add-product-dialog.component';
import { Product } from '../../models/product.model';
import { ComprasService } from '../../service/compras.service';
import { AddPurchaseDialogComponent } from '../../components/add-purchase-dialog/add-purchase-dialog.component';

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

  openDialog() {
    const dialogRef = this.dialog.open(AddProductDialog);

    dialogRef.afterClosed().subscribe(result => {
      if (result)
        this.getProducts()
    });
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
}