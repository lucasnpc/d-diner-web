import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { BusinessStorage } from 'src/app/core/utils/business-storage';
import { STATUS_PREPARED, USER_INFO } from 'src/app/core/utils/constants';
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
    var placedItems: KitchenInfo[] = []
    this.businessCollection.collection(DESKS_COLLECTION, ref => ref.where('isOccupied', '==', true)).get().forEach(desks =>
      desks.docs.forEach(desk => {
        desk.ref.collection(ORDERS_COLLECTION).where('concluded', '==', false).get().then(orders => {
          orders.docs.forEach(order => {
            order.ref.collection(ORDERED_ITEMS_COLLECTION).where('status', '!=', STATUS_PREPARED).onSnapshot(changes => {
              changes.docChanges().map(change => {
                if (change.type == 'added')
                  placedItems.push({
                    id: change.doc.id,
                    deskId: desk.id,
                    orderId: order.id,
                    deskDescription: desk.data()['description'],
                    observations: change.doc.data()['observations'],
                    placedItems: change.doc.data()['placedItems'],
                    status: change.doc.data()['status']
                  })
                if (change.type == 'modified') {
                  const index = placedItems.findIndex(index => index.id == change.doc.id)
                  placedItems[index] = {
                    id: change.doc.id,
                    deskId: desk.id,
                    orderId: order.id,
                    deskDescription: desk.data()['description'],
                    observations: change.doc.data()['observations'],
                    placedItems: change.doc.data()['placedItems'],
                    status: change.doc.data()['status']
                  }
                }
              })
            })
          })
        })
      }))
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
