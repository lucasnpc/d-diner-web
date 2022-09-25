import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Product } from 'src/app/modules/compras/models/product.model';
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
    category: ['', Validators.required],
    descricao: ['', Validators.required],
    preco: ['', Validators.required],
  });

  products: Product[] = []
  filteredProducts: Observable<string[]> = new Observable;
  productsDescription: string[] = [];
  selectedProducts: Product[] = []
  createMenuItemControl = new FormControl('');

  categories = [
    { name: 'Pizzas Salgadas' },
    { name: 'Pizzas Doces' },
    { name: 'Lanches' },
    { name: 'Pratos' },
    { name: 'Bebidas' },
    { name: 'Sobremesas' }
  ]

  constructor(
    private fb: FormBuilder,
    private rest: CardapioService,
    public dialogRef: MatDialogRef<DialogAddInCardapioComponent>,
    private service: CardapioService) { }

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

    var item: MenuItem = {
      id: '',
      price: this.formRegisterItems.get('preco')!.value,
      description: this.formRegisterItems.get('descricao')!.value,
      category: this.formRegisterItems.get('category')!.value.name,
      itemQuantity: 0,
      selected: false
    };
    this.postItem(item)
  }

  postItem(menuItem: MenuItem) {
    try {
      this.rest.postItem(menuItem).then(result => {
        this.rest.postItemProducts(this.selectedProducts, result.id).then(() => {
          this.dialogRef.close(true)
        })
      })
    } catch (error) {
      console.log(error);
      alert('Alguma coisa deu errado')
    }
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
  }

  sumQuantity(p: Product) {
    this._changeQuantity(p)
  }

  lessQuantity(p: Product) {
    this._changeQuantity(p)
  }

  _changeQuantity(p: Product) {
    const itemIndex = this.selectedProducts.findIndex(product => product.id === p.id)
    if (itemIndex < 0) {
      return
    }

    this.selectedProducts[itemIndex] = p
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.productsDescription.filter(p => p.toLowerCase().includes(filterValue));
  }
}
