import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { BusinessStorage } from 'src/app/core/utils/business-storage';
import { USER_INFO } from 'src/app/core/utils/constants';
import { BUSINESS_COLLECTION, DESKS_COLLECTION, ORDERS_COLLECTION } from 'src/app/core/utils/firestore-keys';
import { Desk } from '../model/desk.model';

@Injectable({
  providedIn: 'root'
})
export class DesksService {

  cnpj = this.storage.get(USER_INFO).businessCnpj
  businessCollection = this.firestore.collection(BUSINESS_COLLECTION).doc(this.cnpj)

  constructor(private firestore: AngularFirestore, private storage: BusinessStorage) { }

  async getDesks() {
    var desks: Desk[] = []
    this.businessCollection.collection(DESKS_COLLECTION, ref => {
      ref.where('description', '!=', 'Delivery').onSnapshot(snapshot => {
        snapshot.docChanges().forEach(changes => {
          if (changes.type == 'added') {
            desks.push({
              id: changes.doc.id,
              description: changes.doc.data()['description'],
              isOccupied: changes.doc.data()['isOccupied']
            })
          }
          if (changes.type == 'modified') {
            const index = desks.findIndex(index => index.id == changes.doc.id)
            desks[index] = {
              id: changes.doc.id,
              description: changes.doc.data()['description'],
              isOccupied: changes.doc.data()['isOccupied'],
            }
          }
        })
      })
      return ref
    })
    return desks
  }

  getDeskInfo(id: string) {
    return this.businessCollection.collection(DESKS_COLLECTION).doc(id)
      .collection(ORDERS_COLLECTION, ref => ref.where('concluded', '==', false)).get()
  }
}
