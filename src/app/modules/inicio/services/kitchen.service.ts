import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { BusinessStorage } from 'src/app/core/utils/business-storage';
import { STATUS_STARTING, USER_INFO } from 'src/app/core/utils/constants';
import { BUSINESS_COLLECTION, DESKS_COLLECTION, ORDERED_ITEMS_COLLECTION, ORDERS_COLLECTION } from 'src/app/core/utils/firestore-keys';
import { environment } from 'src/environments/environment';
import { OrderedItems } from '../models/OrderedItems.model';

const getPedidosEnviados = environment.url + 'cozinha/getPedidosEnviados'

const updatePedidoStatus = environment.url + 'cozinha/updatePedidoStatus'

@Injectable({
  providedIn: 'root'
})
export class KitchenService {

  cnpj = this.storage.get(USER_INFO).businessCnpj
  desksRef = this.firestore.collection(BUSINESS_COLLECTION).doc(this.cnpj).collection(DESKS_COLLECTION)

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private httpClient: HttpClient, private firestore: AngularFirestore, private storage: BusinessStorage) { }

  async getSentClientOrders() {
    var placedItems: any[] = [];
    this.firestore.collection(BUSINESS_COLLECTION).doc(this.cnpj).collection(DESKS_COLLECTION, ref => {
      ref.get().then(desks => {
        desks.docs.forEach(desk => {
          ref.doc(desk.id).collection(ORDERS_COLLECTION).where('concluded', '==', false).get().then(orders => {
            orders.docs.forEach(order => {
              order.ref.collection(ORDERED_ITEMS_COLLECTION).where('status', '==', STATUS_STARTING).get().then(placedItemsRef => {
                placedItemsRef.docs.forEach(placedItem => {
                  // const item = placedItem.data()
                  // var order: OrderedItems = {
                  //   id: placedItem.id, observations: item['observations'],
                  //   placedItems: item['placedItems'],
                  //   status: item['status']
                  // }
                  placedItems.push({
                    clientOrderId: placedItem.id,
                    deskDescription: desk.data()['description'],
                    orderStatus: placedItem.data()['status']
                  })
                })
              })
            })
          })
        })
      })
      return ref
    })
    return placedItems
  }

  updateOrderStatus(id: any) {
    return this.httpClient.put<any>(updatePedidoStatus, id, this.httpOptions)
  }
}
