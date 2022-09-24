import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { BusinessStorage } from 'src/app/core/utils/business-storage';
import { USER_INFO } from 'src/app/core/utils/constants';
import { BUSINESS_COLLECTION, PRODUCTS_COLLECTION } from 'src/app/core/utils/firestore-keys';
import { Product } from '../models/product.model';

@Injectable()
export class ComprasService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  constructor(private firestore: AngularFirestore, private storage: BusinessStorage) { }

  async getProducts() {
    var products: Product[] = []
    this.firestore.collection(BUSINESS_COLLECTION).doc(this.storage.get(USER_INFO).businessCnpj)
      .collection(PRODUCTS_COLLECTION, ref => {
        ref.onSnapshot(snapshot => {
          snapshot.docChanges().forEach(changes => {
            if (changes.type == 'added') {
              products.push({
                id: changes.doc.id,
                name: changes.doc.data()['name'],
                minimumStock: changes.doc.data()['minimumStock'],
                currentStock: changes.doc.data()['currentStock'],
                measurementUnit: changes.doc.data()['measurementUnit'],
                barcode: changes.doc.data()['barcode'],
                selected: false
              })
            }
            if (changes.type == 'modified') {
              const index = products.findIndex(index => index.id == changes.doc.id)
              products[index] = {
                id: changes.doc.id,
                name: changes.doc.data()['name'],
                minimumStock: changes.doc.data()['minimumStock'],
                currentStock: changes.doc.data()['currentStock'],
                measurementUnit: changes.doc.data()['measurementUnit'],
                barcode: changes.doc.data()['barcode'],
                selected: false
              }
            }
            if (changes.type == 'removed') {
              const index = products.findIndex(index => index.id == changes.doc.id)
              products.splice(index, 1)
            }
          })
        })
        return ref
      })
    return products
  }

  getProviders(cnpj: string) {
    // return this.httpClient.get<{ data: Provider[] }>(getFornecedores, { params: { businessCnpj: cnpj } });
  }

  postProduct(product: Product) {
    // return this.httpClient.post<any>(postProduto, product, this.httpOptions)
  }

  postPurchase(purchase: any) {
    // return this.httpClient.post<any>(postCompra, purchase, this.httpOptions)
  }

  updateProductCurrentStock(stock: any) {
    // return this.httpClient.put(updateEstoqueAtualProduto, stock, this.httpOptions)
  }
}
