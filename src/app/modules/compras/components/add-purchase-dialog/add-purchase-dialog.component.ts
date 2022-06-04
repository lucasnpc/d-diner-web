import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BusinessStorage } from 'src/app/core/utils/business-storage';
import { BUSINESS_CNPJ } from 'src/app/core/utils/constants';
import { ProductRequest } from 'src/app/modules/cardapio/models/menu-item-product.model';
import { PurchaseRequest } from '../../models/purchaseRequest.model';
import { ComprasService } from '../../service/compras.service';

interface Purchase {
  description: string;
  quantityPurchased: number;
  totalCostValue: number;
  productId: number;
  businessCnpj: string;
  datePurchased: Date;
  productBatch: string;
  providerCnpj: string;
}

const formatter = new Intl.NumberFormat('en-US', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

@Component({
  selector: 'rp-add-purchase-dialog',
  templateUrl: './add-purchase-dialog.component.html',
  styleUrls: ['./add-purchase-dialog.component.less']
})
export class AddPurchaseDialogComponent implements OnInit {

  step = 0;

  constructor(@Inject(MAT_DIALOG_DATA) public data: PurchaseRequest[], private storage: BusinessStorage, private service: ComprasService) { }

  ngOnInit(): void {
  }

  addPurchase() {
    // this.data.map(p => {
    //   const purchase: Purchase = {
    //     description: p.productName,
    //     quantityPurchased: p.quantity,
    //     totalCostValue: p.totalCostValue,
    //     productId: p.productId,
    //     businessCnpj: this.storage.get(BUSINESS_CNPJ),
    //     datePurchased: new Date(),
    //     productBatch: '',
    //     providerCnpj: ''
    //   }

    //   this.service.updateProductCurrentStock({ stock: Number(p.currentStock) + p.quantity, id: p.productId }).subscribe()

    //   this.service.postPurchase(purchase).subscribe(result => {
    //     if (result.success)
    //       alert('Compra registrada com sucesso!')
    //   })
    // })
  }
}
