import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { BusinessStorage } from 'src/app/core/utils/business-storage';
import { USER_INFO } from 'src/app/core/utils/constants';
import { formatter } from 'src/app/core/utils/numberFormatter';
import { Product } from 'src/app/modules/compras/models/product.model';
import { ProductRequest } from '../../models/menu-item-product.model';
import { MenuItem } from '../../models/menu-item.model';
import { CardapioService } from '../../service/menu.service';
import { DialogAddInCardapioComponent } from '../dialog-add-in-cardapio/dialog-add-in-cardapio.component';

@Component({
  selector: 'rp-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.less'],
})
export class AddItemComponent implements OnInit {
  formRegisterItems = this.fb.group({
    preco: ['', Validators.required],
    descricao: ['', Validators.required],
  });

  products: Product[] = []
  filteredProducts: Observable<string[]> = new Observable;
  productsDescription: string[] = [];
  selectedProducts: Product[] = []
  createMenuItemControl = new FormControl('');

  productRequest: ProductRequest[] = []

  constructor(
    private fb: FormBuilder,
    private rest: CardapioService,
    public dialogRef: MatDialogRef<DialogAddInCardapioComponent>,
    private service: CardapioService,
    private storage: BusinessStorage
  ) { }

  ngOnInit(): void {
    this.service.getProducts().subscribe(result => {
      this.products = result
      this.productsDescription = this.products.map(p => p.name)      

      this.filteredProducts = this.createMenuItemControl.valueChanges.pipe(
        startWith(''),
        map(value => this._filter(value))
      )
    })
  }

  addItem() {
    if (this.selectedProducts.length == 0) {
      alert('Selecione produtos para compôr seu item')
      return
    }

    var dados: MenuItem = {
      id: '',
      price: this.formRegisterItems.get('preco')!.value,
      description: this.formRegisterItems.get('descricao')!.value,
      itemQuantity: 0,
      selected: false
    };
    this.postItem(dados)
  }

  postItem(data: any) {
    this.rest.postItem(data).subscribe((result) => {
      if (result) {
        this.productRequest.map(p => {
          this.rest.postMenuItemProduct({
            itemId: result.itemId,
            productId: p.productId,
            productQuantity: p.quantity
          }).subscribe(result => {
            if (result.success)
              this.dialogRef.close(true)
          })
        })
      }
    })
  }

  setProduct(p: string) {
    this.createMenuItemControl.setValue('', { emitEvent: true })

    // verifica se o item já esta na lista de items 
    if (this.selectedProducts.some(product => product.name === p)) {
      alert("Este item já esta na lista")
      return
    }

    const product = this.products.find(i => i.name === p)
    if (!product) {
      return
    }

    this.selectedProducts.push(product)
    this.productRequest.push({ productId: product.id!, quantity: 1 })
  }

  sumQuantity(p: ProductRequest) {
    // this.selectedProducts.map(value => value.productId == order.productId ? this.totalOrder += Number(value.price) : undefined)
    this._changeQuantity(p)
  }

  lessQuantity(p: ProductRequest) {
    //this.selectedItems.map(value => value.itemId == order.itemId ? this.totalOrder -= Number(value.price) : undefined)
    this._changeQuantity(p)
  }

  _changeQuantity(p: ProductRequest) {
    const itemIndex = this.productRequest.findIndex(product => product.productId === p.productId)
    if (itemIndex < 0) {
      return
    }

    this.productRequest[itemIndex].quantity = Number(formatter.format(p.quantity!))
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.productsDescription.filter(p => p.toLowerCase().includes(filterValue));
  }
}
