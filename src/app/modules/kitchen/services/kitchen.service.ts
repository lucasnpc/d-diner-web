import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { BusinessStorage } from 'src/app/core/utils/business-storage';
import { STATUS_STARTING, USER_INFO } from 'src/app/core/utils/constants';
import { BUSINESS_COLLECTION, DESKS_COLLECTION, MENU_ITEMS_COLLECTION, ORDERED_ITEMS_COLLECTION, ORDERS_COLLECTION } from 'src/app/core/utils/firestore-keys';
import { KitchenInfo } from '../models/KitchenInfo.model';
import { MenuItemInfo } from '../models/MenuItemInfo.model';

@Injectable({
  providedIn: 'root'
})
export class KitchenService {

  cnpj = this.storage.get(USER_INFO).businessCnpj
  businessCollection = this.firestore.collection(BUSINESS_COLLECTION).doc(this.cnpj)

  constructor(private firestore: AngularFirestore, private storage: BusinessStorage) { }

  async getSentClientOrders() {
    var placedItems: KitchenInfo[] = [];
    this.businessCollection.collection(DESKS_COLLECTION, ref => {
      ref.get().then(desks => {
        desks.docs.forEach(desk => {
          ref.doc(desk.id).collection(ORDERS_COLLECTION).where('concluded', '==', false).get().then(orders => {
            orders.docs.forEach(order => {
              order.ref.collection(ORDERED_ITEMS_COLLECTION).where('status', '==', STATUS_STARTING).onSnapshot(snapshot => {
                snapshot.docChanges().forEach(change => {
                  if (change.type == 'added') {
                    const item = change.doc.data()
                    placedItems.push({
                      id: change.doc.id,
                      deskId: desk.id,
                      orderId: order.id,
                      deskDescription: desk.data()['description'],
                      observations: item['observations'],
                      placedItems: item['placedItems'],
                      status: item['status']
                    })
                  }
                  if (change.type == 'modified') {
                    const item = change.doc.data()
                    const index = placedItems.findIndex(index => index.id == change.doc.id)
                    placedItems[index] = {
                      id: change.doc.id,
                      deskId: desk.id,
                      orderId: order.id,
                      deskDescription: desk.data()['description'],
                      observations: item['observations'],
                      placedItems: item['placedItems'],
                      status: item['status']
                    }
                  }
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

  async getMenuItems(placedItems: { [key: string]: number }) {
    const menuItems: MenuItemInfo[] = []
    const keys = Object.keys(placedItems)
    keys.forEach(key => {
      this.businessCollection.collection(MENU_ITEMS_COLLECTION).doc(key).get().subscribe(doc => {
        if (doc.exists) {
          const data = doc.data()!
          menuItems.push({
            id: doc.id,
            description: data['description'],
            price: data['price'],
            quantity: placedItems[key]
          })
        }
      })
    })
    return menuItems
  }

  async updateOrderStatus(info: KitchenInfo, status: string) {
    return this.businessCollection.collection(DESKS_COLLECTION).doc(info.deskId).collection(ORDERS_COLLECTION)
      .doc(info.orderId).collection(ORDERED_ITEMS_COLLECTION).doc(info.id).update({ status: status })
  }
}
