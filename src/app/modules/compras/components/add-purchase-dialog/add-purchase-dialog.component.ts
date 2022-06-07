import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BusinessStorage } from 'src/app/core/utils/business-storage';
import { BUSINESS_CNPJ } from 'src/app/core/utils/constants';
import { Provider } from 'src/app/modules/fornecedores/models/provider.model';
import { Purchase } from '../../models/purchase.model';
import { PurchaseRequest } from '../../models/purchaseRequest.model';
import { ComprasService } from '../../service/compras.service';

@Component({
  selector: 'rp-add-purchase-dialog',
  templateUrl: './add-purchase-dialog.component.html',
  styleUrls: ['./add-purchase-dialog.component.less']
})
export class AddPurchaseDialogComponent implements OnInit {

  formRegisterPurchase = this.fb.group({
    provider: ['', Validators.required],
    productBatch: ['', Validators.required],
    costValue: ['', Validators.required],
    quantityPurchased: ['', Validators.required],
    expirationDate: ['']
  });

  step = 0;
  providerOpts: Provider[] = []
  purchases: Purchase[] = []

  constructor(@Inject(MAT_DIALOG_DATA) public data: PurchaseRequest[], private storage: BusinessStorage,
    private service: ComprasService, private fb: FormBuilder, public dialogRef: MatDialogRef<AddPurchaseDialogComponent>,
  ) { }

  ngOnInit(): void {
    this.service.getProviders(this.storage.get(BUSINESS_CNPJ)).subscribe(result => {
      if (result)
        this.providerOpts = result.data
    })
    this.data.map(p => {
      this.purchases.push({
        description: p.productName,
        quantityPurchased: 0,
        unitCostValue: 0,
        productId: p.productId,
        businessCnpj: this.storage.get(BUSINESS_CNPJ),
        datePurchased: new Date(),
        productBatch: '',
        provider: new Provider(),
        expirationDate: undefined
      })
    })
  }

  addPurchase() {
    this.purchases.map(p => {
      const purchase: Purchase = p

      const index = this.data.findIndex(product => product.productId === p.productId)

      this.service.updateProductCurrentStock({ stock: Number(this.data[index].currentStock) + p.quantityPurchased, id: p.productId }).subscribe()

      this.service.postPurchase(purchase).subscribe()
    })
  }

  previousStep(index: number) {
    this.step = Number(index -= 1)
  }

  nextStep(index: number) {
    this.step = Number(index += 1)
  }

  setStep(index: number) {
    this.step = index
  }
}
