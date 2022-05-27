import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { BusinessStorage } from 'src/app/core/utils/business-storage';
import { BUSINESS_CNPJ } from 'src/app/core/utils/constants';
import { Provider } from 'src/app/modules/fornecedores/models/provider.model';
import { Product } from '../../models/product.model';
import { ComprasService } from '../../service/compras.service';

interface MeasureUnit {
  name: string
}

@Component({
  selector: 'rp-dialog-add-in-contas',
  templateUrl: './add-product-dialog.component.html',
  styleUrls: ['./add-product-dialog.component.less']
})
export class AddProductDialog implements OnInit {

  formRegisterProduct = this.fb.group({
    productName: ['', Validators.required],
    minimumStock: ['', Validators.required],
    maximumStock: ['', Validators.required],
    currentStock: ['', Validators.required],
    measurementUnit: ['', Validators.required],
    barcode: [''],
    productBatch: [''],
    costValue: ['', Validators.required],
    providerCnpj: ['']
  });

  measureOpts: MeasureUnit[] = [
    { name: 'Quilos' },
    { name: 'Litros' },
    { name: 'Gramas' },
    { name: 'Unidade' }
  ]

  providerOpts: Provider[] = []

  constructor(private fb: FormBuilder, private storage: BusinessStorage, private service: ComprasService,
    private dialogRef: MatDialogRef<AddProductDialog>,
  ) { }

  ngOnInit(): void {
    this.service.getProviders(this.storage.get(BUSINESS_CNPJ)).subscribe(result => {
      if (result)
        this.providerOpts = result.data
    })
  }

  addProduct() {
    var data: Product = {
      productId: null,
      productName: this.formRegisterProduct.get('productName').value,
      minimumStock: this.formRegisterProduct.get('minimumStock').value,
      maximumStock: this.formRegisterProduct.get('maximumStock').value,
      currentStock: this.formRegisterProduct.get('currentStock').value,
      measurementUnit: this.formRegisterProduct.get('measurementUnit').value.name,
      businessCnpj: this.storage.get(BUSINESS_CNPJ),
      barcode: this.formRegisterProduct.get('barcode').value,
      productBatch: this.formRegisterProduct.get('productBatch').value,
      costValue: this.formRegisterProduct.get('costValue').value,
      providerCnpj: this.formRegisterProduct.get('providerCnpj').value.providerCnpj,
      selected: undefined
    };
    if (data.barcode == '') {
      data.barcode = undefined
    }
    if (data.productBatch === '') {
      data.productBatch = undefined
    }
    if (data.businessCnpj === undefined) {
      data.businessCnpj = undefined
    }

    this.service.postProduct(data).subscribe(result => {
      if (result.success) this.dialogRef.close(true)
    })
  }

}
