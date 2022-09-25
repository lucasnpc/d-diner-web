import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map, Observable } from 'rxjs';
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
  desks: Observable<Desk[]>

  constructor(private firestore: AngularFirestore, private storage: BusinessStorage) {
    this.desks = this.businessCollection.collection(DESKS_COLLECTION, ref => ref.where('description', '!=', 'Delivery'))
      .snapshotChanges().pipe(
        map(changes => changes.map(c => ({
          id: c.payload.doc.id,
          description: c.payload.doc.data()['description'],
          isOccupied: c.payload.doc.data()['isOccupied']
        })))
      )
  }

  getDesks() {
    return this.desks
  }

  getDeskInfo(id: string) {
    return this.businessCollection.collection(DESKS_COLLECTION).doc(id)
      .collection(ORDERS_COLLECTION, ref => ref.where('concluded', '==', false)).get()
  }
}
