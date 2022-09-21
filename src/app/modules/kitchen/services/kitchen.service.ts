import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { BusinessStorage } from 'src/app/core/utils/business-storage';
import { STATUS_STARTING, USER_INFO } from 'src/app/core/utils/constants';
import { BUSINESS_COLLECTION, DESKS_COLLECTION, ORDERED_ITEMS_COLLECTION, ORDERS_COLLECTION } from 'src/app/core/utils/firestore-keys';
import { KitchenInfo } from '../models/KitchenInfo.model';

@Injectable({
  providedIn: 'root'
})
export class KitchenService {

  cnpj = this.storage.get(USER_INFO).businessCnpj

  constructor(private firestore: AngularFirestore, private storage: BusinessStorage) { }

  async getSentClientOrders() {
    var placedItems: KitchenInfo[] = [];
    this.firestore.collection(BUSINESS_COLLECTION).doc(this.cnpj).collection(DESKS_COLLECTION, ref => {
      ref.get().then(desks => {
        desks.docs.forEach(desk => {
          ref.doc(desk.id).collection(ORDERS_COLLECTION).where('concluded', '==', false).get().then(orders => {
            orders.docs.forEach(order => {
              order.ref.collection(ORDERED_ITEMS_COLLECTION).where('status', '==', STATUS_STARTING).get().then(placedItemsRef => {
                placedItemsRef.docs.forEach(placedItem => {
                  const item = placedItem.data()
                  placedItems.push({
                    id: placedItem.id,
                    deskId: desk.id,
                    deskDescription: desk.data()['description'],
                    observations: item['observations'],
                    placedItems: item['placedItems'],
                    status: item['status']
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
    // return this.httpClient.put<any>(updatePedidoStatus, id, this.httpOptions)
  }
}
