import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { BusinessStorage } from 'src/app/core/utils/business-storage';
import { datePipe, SAVE_DATE_FORMAT, USER_INFO } from 'src/app/core/utils/constants';
import { BUSINESS_COLLECTION, PRODUCTS_COLLECTION, PRODUCTS_PURCHASES_COLLECTION } from 'src/app/core/utils/firestore-keys';
import { Product } from '../models/product.model';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Purchase } from '../models/purchase.model';

@Injectable()
export class ComprasService {

  products: Observable<Product[]>


  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  constructor(private firestore: AngularFirestore, private storage: BusinessStorage) {
    this.products = this.firestore.collection(BUSINESS_COLLECTION).doc(this.storage.get(USER_INFO).businessCnpj)
      .collection(PRODUCTS_COLLECTION).snapshotChanges().pipe(
        map(changes => changes.map(c => ({
          id: c.payload.doc.id,
          name: c.payload.doc.data()['name'],
          minimumStock: c.payload.doc.data()['minimumStock'],
          currentStock: c.payload.doc.data()['currentStock'],
          measurementUnit: c.payload.doc.data()['measurementUnit'],
          barcode: c.payload.doc.data()['barcode'],
          selected: false,
          menuItemQuantity: 0
        })))
      )
  }

  getProducts() {
    return this.products
  }

  async postProduct(product: Product) {
    this.firestore.collection(BUSINESS_COLLECTION).doc(this.storage.get(USER_INFO).businessCnpj)
      .collection(PRODUCTS_COLLECTION).add(({
        name: product.name,
        minimumStock: product.minimumStock,
        currentStock: product.currentStock,
        measurementUnit: product.measurementUnit,
        barcode: product.barcode,
      }))
  }

  async updateProduct(product: Product) {
    this.firestore.collection(BUSINESS_COLLECTION).doc(this.storage.get(USER_INFO).businessCnpj)
      .collection(PRODUCTS_COLLECTION).doc(product.id).update(({
        name: product.name,
        minimumStock: product.minimumStock,
        measurementUnit: product.measurementUnit,
        barcode: product.barcode,
      }))
  }

  async deleteProduct(product: Product) {
    this.firestore.collection(BUSINESS_COLLECTION).doc(this.storage.get(USER_INFO).businessCnpj)
      .collection(PRODUCTS_COLLECTION).doc(product.id).delete()
  }

  async updateProductCurrentStock(product: Product) {
    this.firestore.collection(BUSINESS_COLLECTION).doc(this.storage.get(USER_INFO).businessCnpj).collection(PRODUCTS_COLLECTION)
      .doc(product.id).update(({
        currentStock: product.currentStock
      }))
  }

  async postPurchase(purchase: Purchase, id: string) {
    this.firestore.collection(BUSINESS_COLLECTION).doc(this.storage.get(USER_INFO).businessCnpj).collection(PRODUCTS_COLLECTION)
      .doc(id).collection(PRODUCTS_PURCHASES_COLLECTION).add(({
        batch: purchase.batch,
        description: purchase.description,
        expirationDate: datePipe.transform(purchase.expirationDate, SAVE_DATE_FORMAT),
        providerCnpj: purchase.provider?.idCnpj,
        purchaseDate: datePipe.transform(purchase.purchaseDate, SAVE_DATE_FORMAT),
        quantity: purchase.quantity,
        unitCostValue: purchase.unitCostValue,
      }))
  }
}
