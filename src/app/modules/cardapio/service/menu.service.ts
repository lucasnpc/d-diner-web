import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { BusinessStorage } from 'src/app/core/utils/business-storage';
import { environment } from 'src/environments/environment';
import { Product } from '../../compras/models/product.model';
import { MenuItem } from '../models/menu-item.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BUSINESS_COLLECTION, MENU_ITEMS_COLLECTION, PRODUCTS_COLLECTION } from 'src/app/core/utils/firestore-keys';
import { USER_INFO } from 'src/app/core/utils/constants';

const get = environment.url + 'itens/getItem';
const getProdutos = environment.url + 'produtos/getProdutos';

const post = environment.url + 'itens/postItem';
const postProdutoItem = environment.url + 'itens/postProdutoItem'

@Injectable({
  providedIn: 'root'
})
export class CardapioService {

  menuItems: Observable<MenuItem[]>
  products: Observable<Product[]>

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private httpClient: HttpClient, private firestore: AngularFirestore, private storage: BusinessStorage) {
    this.menuItems = firestore.collection(BUSINESS_COLLECTION).doc(storage.get(USER_INFO).businessCnpj).collection(MENU_ITEMS_COLLECTION)
      .snapshotChanges().pipe(map(changes => changes.map(c => ({
        id: c.payload.doc.id,
        price: c.payload.doc.data()['price'],
        description: c.payload.doc.data()['description'],
        itemQuantity: 0,
        selected: false
      }))))

    this.products = firestore.collection(BUSINESS_COLLECTION).doc(storage.get(USER_INFO).businessCnpj).collection(PRODUCTS_COLLECTION)
      .snapshotChanges().pipe(map(changes => changes.map(c => ({
        id: c.payload.doc.id,
        name: c.payload.doc.data()['name'],
        minimumStock: c.payload.doc.data()['minimumStock'],
        currentStock: c.payload.doc.data()['currentStock'],
        measurementUnit: c.payload.doc.data()['measurementUnit'],
        barcode: c.payload.doc.data()['barcode'],
        selected: false,
      }))))
  }

  getItems() {
    return this.menuItems
  }

  getProducts() {
    return this.products
  }

  public postItem(item: any) {
    return this.httpClient.post<any>(post, item, this.httpOptions);
  }
  postMenuItemProduct(productMenuItem: any) {
    return this.httpClient.post<any>(postProdutoItem, productMenuItem, this.httpOptions);
  }
}
