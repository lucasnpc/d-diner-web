import { Component, Inject, OnInit } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
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
  isEditting = false;

  constructor(private fb: UntypedFormBuilder, private service: ComprasService,
    private dialogRef: MatDialogRef<AddProductDialog>, @Inject(MAT_DIALOG_DATA) public data: Product
  ) { }

  ngOnInit(): void {
    if (this.data.id != undefined) {
      const opt = this.measureOpts.find(index => index.name == this.data.measurementUnit)
      this.formRegisterProduct.controls['measurementUnit'].setValue(opt)
      this.isEditting = true
    }
  }

  sendProduct(edit: boolean) {
    var data: Product = {
      id: this.data.id,
      name: this.formRegisterProduct.get('productName')!.value,
      minimumStock: this.formRegisterProduct.get('minimumStock')!.value,
      currentStock: 0,
      measurementUnit: this.formRegisterProduct.get('measurementUnit')!.value.name,
      barcode: this.formRegisterProduct.get('barcode')!.value,
      selected: false,
      menuItemQuantity: 0
    };

    edit ? this.updateProduct(data) : this.addProduct(data)
  }

  addProduct(product: Product) {
    this.service.postProduct(product).then(() => {
      this.dialogRef.close(true)
    }).catch(e => console.log(e))
  }

  updateProduct(product: Product) {
    this.service.updateProduct(product).then(() => {
      this.dialogRef.close(true)
    }).catch(e => console.log(e))
  }
}
