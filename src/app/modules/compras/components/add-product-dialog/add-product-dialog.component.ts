import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { BusinessStorage } from 'src/app/core/utils/business-storage';
import { USER_INFO } from 'src/app/core/utils/constants';
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
    measurementUnit: ['', Validators.required],
    barcode: [''],
  });

  measureOpts: MeasureUnit[] = [
    { name: 'Quilos' },
    { name: 'Litros' },
    { name: 'Gramas' },
    { name: 'Unidade' }
  ]

  constructor(private fb: FormBuilder, private storage: BusinessStorage, private service: ComprasService,
    private dialogRef: MatDialogRef<AddProductDialog>,
  ) { }

  ngOnInit(): void {

  }

  addProduct() {
    var data: Product = {
      productId: undefined,
      productName: this.formRegisterProduct.get('productName')!.value,
      minimumStock: this.formRegisterProduct.get('minimumStock')!.value,
      currentStock: 0,
      measurementUnit: this.formRegisterProduct.get('measurementUnit')!.value.name,
      businessCnpj: JSON.parse(this.storage.get(USER_INFO)).businessCnpj,
      barcode: this.formRegisterProduct.get('barcode')!.value,
      selected: undefined
    };

    this.service.postProduct(data).subscribe(result => {
      if (result.success) this.dialogRef.close(true)
    })
  }

}
