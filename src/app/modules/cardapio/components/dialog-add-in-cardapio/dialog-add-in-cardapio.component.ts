import { Component, Inject, OnInit } from '@angular/core';
import { Validators, UntypedFormControl, UntypedFormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable, startWith, map } from 'rxjs';
import { Product } from 'src/app/modules/compras/models/product.model';
import { ItemProducts } from '../../models/item-products.model';
import { MenuItem } from '../../models/menu-item.model';
import { MenuService } from '../../service/menu.service';

@Component({
  selector: 'rp-dialog-add-in-cardapio',
  templateUrl: './dialog-add-in-cardapio.component.html',
  styleUrls: ['./dialog-add-in-cardapio.component.less']
})
export class DialogAddInCardapioComponent implements OnInit {

  formRegisterItems = this.fb.group({
    category: ['', Validators.required],
    descricao: ['', Validators.required],
    preco: ['', Validators.required],
  });

  products: Product[] = []
  filteredProducts: Observable<string[]> = new Observable;
  productsDescription: string[] = [];
  selectedProducts: Product[] = []
  createMenuItemControl = new UntypedFormControl('');
  itemProducts: ItemProducts[] = []

  categories = [
    { name: 'Pizzas Salgadas' },
    { name: 'Pizzas Doces' },
    { name: 'Lanches' },
    { name: 'Pratos' },
    { name: 'Bebidas' },
    { name: 'Sobremesas' }
  ]

  isEditting = false;

  constructor(
    private fb: UntypedFormBuilder,
    private rest: MenuService,
    public dialogRef: MatDialogRef<DialogAddInCardapioComponent>,
    private service: MenuService, @Inject(MAT_DIALOG_DATA) public data: MenuItem) { }

  ngOnInit(): void {
    this.service.getProducts().subscribe(result => {
      this.products = result
      this.productsDescription = this.products.map(p => p.name)

      this.filteredProducts = this.createMenuItemControl.valueChanges.pipe(
        startWith(''),
        map(value => this._filter(value))
      )

      if (this.data.id != undefined) {
        const opt = this.categories.find(index => index.name == this.data.category)
        this.formRegisterItems.controls['category'].setValue(opt)
        this.isEditting = true
        this.service.getItemsProducts(this.data.id).forEach(docs => {
          docs.forEach(doc => {
            this.setProduct(doc.data()['description'], doc.data()['quantity'])
          })
        })
      }
    })
  }

  setProduct(p: string, q: number | undefined) {
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
    if (q != undefined)
      product.menuItemQuantity = q

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

  sendItem(edit: boolean) {
    if (this.selectedProducts.length == 0) {
      alert('Selecione produtos para compôr seu item')
      return
    }

    var item: MenuItem = {
      id: this.data.id,
      price: this.formRegisterItems.get('preco')!.value,
      description: this.formRegisterItems.get('descricao')!.value,
      category: this.formRegisterItems.get('category')!.value.name,
      itemQuantity: 0,
      selected: false
    };

    edit ? this.updateItem(item) : this.addItem(item)
  }

  addItem(item: MenuItem) {
    try {
      this.rest.postItem(item).then(result => {
        this.rest.postItemProducts(this.selectedProducts, result.id).then(() => {
          this.dialogRef.close(true)
        })
      })
    } catch (error) {
      console.log(error);
      alert('Alguma coisa deu errado')
    }
  }

  updateItem(item: MenuItem) {
    try {
      this.rest.updateItem(item).then(() => {
        this.rest.updateItemProducts(this.selectedProducts, item.id).then(() => {
          this.dialogRef.close(true)
        })
      })
    } catch (error) {
      console.log(error);
      alert('Alguma coisa deu errado')
    }
  }
}
