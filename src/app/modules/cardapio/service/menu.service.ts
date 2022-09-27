import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { BusinessStorage } from 'src/app/core/utils/business-storage';
import { Product } from '../../compras/models/product.model';
import { MenuItem } from '../models/menu-item.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BUSINESS_COLLECTION, ITEMS_PRODUCTS_COLLECTION, MENU_ITEMS_COLLECTION, PRODUCTS_COLLECTION } from 'src/app/core/utils/firestore-keys';
import { USER_INFO } from 'src/app/core/utils/constants';

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

  constructor(private firestore: AngularFirestore, private storage: BusinessStorage) {
    this.menuItems = firestore.collection(BUSINESS_COLLECTION).doc(storage.get(USER_INFO).businessCnpj).collection(MENU_ITEMS_COLLECTION)
      .snapshotChanges().pipe(map(changes => changes.map(c => ({
        id: c.payload.doc.id,
        category: c.payload.doc.data()['category'],
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
        menuItemQuantity: 0
      }))))
  }

  getItems() {
    return this.menuItems
  }

  getProducts() {
    return this.products
  }

  getItemsProducts(id: string) {
    return this.firestore.collection(BUSINESS_COLLECTION).doc(this.storage.get(USER_INFO).businessCnpj).collection(MENU_ITEMS_COLLECTION)
      .doc(id).collection(ITEMS_PRODUCTS_COLLECTION).get()
  }

  async postItem(item: MenuItem) {
    return this.firestore.collection(BUSINESS_COLLECTION).doc(this.storage.get(USER_INFO).businessCnpj)
      .collection(MENU_ITEMS_COLLECTION).add(({
        category: item.category,
        description: item.description,
        price: item.price
      }))
  }

  async postItemProducts(selectedProducts: Product[], id: string) {
    selectedProducts.forEach(product => {
      this.firestore.collection(BUSINESS_COLLECTION).doc(this.storage.get(USER_INFO).businessCnpj)
        .collection(MENU_ITEMS_COLLECTION).doc(id).collection(ITEMS_PRODUCTS_COLLECTION).doc(product.id).set(({
          description: product.name,
          quantity: product.menuItemQuantity
        }))
    })
  }

  async updateItem(item: MenuItem) {
    return this.firestore.collection(BUSINESS_COLLECTION).doc(this.storage.get(USER_INFO).businessCnpj)
      .collection(MENU_ITEMS_COLLECTION).doc(item.id).update({
        category: item.category,
        description: item.description,
        price: item.price
      })
  }

  async updateItemProducts(selectedProducts: Product[], id: string) {
    selectedProducts.forEach(product => {
      this.firestore.collection(BUSINESS_COLLECTION).doc(this.storage.get(USER_INFO).businessCnpj)
        .collection(MENU_ITEMS_COLLECTION).doc(id).collection(ITEMS_PRODUCTS_COLLECTION).doc(product.id).set(({
          description: product.name,
          quantity: product.menuItemQuantity
        }))
    })
  }

  async deleteItem(id: string) {
    this.firestore.collection(BUSINESS_COLLECTION).doc(this.storage.get(USER_INFO).businessCnpj)
      .collection(MENU_ITEMS_COLLECTION).doc(id).delete()
  }
}
