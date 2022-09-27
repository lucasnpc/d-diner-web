import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Provider } from 'src/app/modules/fornecedores/models/provider.model';
import { ProvidersService } from 'src/app/modules/fornecedores/services/fornecedores.service';
import { Product } from '../../models/product.model';
import { Purchase } from '../../models/purchase.model';
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

  constructor(@Inject(MAT_DIALOG_DATA) public data: Product[], private service: ComprasService, private providerService: ProvidersService,
    private fb: FormBuilder, public dialogRef: MatDialogRef<AddPurchaseDialogComponent>,
  ) { }

  ngOnInit(): void {
    this.providerService.getProviders().subscribe(result => {
      if (result)
        this.providerOpts = result
    })
    this.data.map(p => {
      this.purchases.push({
        batch: '',
        description: `Compra de ${p.name}`,
        unitCostValue: 0,
        expirationDate: undefined,
        purchaseDate: new Date(),
        quantity: 0,
        provider: undefined,
      })
    })
  }

  addPurchase() {
    for (const i in this.purchases) {
      this.data[i].currentStock += this.purchases[i].quantity
      this.service.updateProductCurrentStock(this.data[i]).catch(e => console.log(e))
      this.service.postPurchase(this.purchases[i], this.data[i].id).catch(e => console.log(e))
    }
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
