import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { BusinessStorage } from 'src/app/core/utils/business-storage';
import { USER_INFO } from 'src/app/core/utils/constants';
import { BUSINESS_COLLECTION, PRODUCTS_COLLECTION } from 'src/app/core/utils/firestore-keys';
import { Product } from '../models/product.model';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

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
      .collection(PRODUCTS_COLLECTION).doc(product.id).set(({
        name: product.name,
        minimumStock: product.minimumStock,
        currentStock: product.currentStock,
        measurementUnit: product.measurementUnit,
        barcode: product.barcode,
      }))
  }

  async deleteProduct(product: Product) {
    this.firestore.collection(BUSINESS_COLLECTION).doc(this.storage.get(USER_INFO).businessCnpj)
      .collection(PRODUCTS_COLLECTION).doc(product.id).delete()
  }

  postPurchase(purchase: any) {
    // return this.httpClient.post<any>(postCompra, purchase, this.httpOptions)
  }

  updateProductCurrentStock(stock: any) {
    // return this.httpClient.put(updateEstoqueAtualProduto, stock, this.httpOptions)
  }
}
