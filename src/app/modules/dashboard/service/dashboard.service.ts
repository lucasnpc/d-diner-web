import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map, Observable } from 'rxjs';
import { BusinessStorage } from 'src/app/core/utils/business-storage';
import { datePipe, SAVE_DATE_FORMAT, USER_INFO } from 'src/app/core/utils/constants';
import { BUSINESS_COLLECTION, DESKS_COLLECTION, EXPENSES_COLLECTION, GAINS_COLLECTION, ORDERS_COLLECTION } from 'src/app/core/utils/firestore-keys';
import { Desk } from '../../desks/model/desk.model';
import { Order } from '../models/order.model';

@Injectable()
export class DashboardService {

  desks: Observable<Desk[]>

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private firestore: AngularFirestore, private storage: BusinessStorage) {
    this.desks = firestore.collection(BUSINESS_COLLECTION).doc(storage.get(USER_INFO).businessCnpj)
      .collection(DESKS_COLLECTION, ref => ref.where('isOccupied', "==", true)).snapshotChanges().pipe(
        map(changes => changes.map(c => ({
          id: c.payload.doc.id,
          description: c.payload.doc.data()['description'],
          isOccupied: c.payload.doc.data()['isOccupied']
        })))
      )
  }

  getBusyDesks() {
    return this.desks
  }

  async getConcludedOrders(date: Date) {
    var orders: Order[] = []
    const dateConverted = datePipe.transform(date, SAVE_DATE_FORMAT)
    this.firestore.collection(BUSINESS_COLLECTION).doc(this.storage.get(USER_INFO).businessCnpj)
      .collection(DESKS_COLLECTION, ref => {
        ref.get().then(desks => {
          desks.docs.forEach(desk => {
            ref.doc(desk.id).collection(ORDERS_COLLECTION).where('concluded', '==', true).where('endDate', '==', dateConverted).onSnapshot(snapshot => {
              snapshot.docChanges().forEach(changes => {
                if (changes.type == 'added') {
                  orders.push({
                    orderId: changes.doc.id,
                    employeeCpf: changes.doc.data()['employeeCpf'],
                    deskDescription: desk.data()['description'],
                    concluded: changes.doc.data()['concluded'],
                    startDate: changes.doc.data()['startDate'],
                    startHour: changes.doc.data()['startHour'],
                    endDate: changes.doc.data()['endDate'],
                    endHour: changes.doc.data()['endHour']
                  })
                }
                if (changes.type == 'modified') {
                  const index = orders.findIndex(index => index.orderId == changes.doc.id)
                  orders[index] = {
                    orderId: changes.doc.id,
                    employeeCpf: changes.doc.data()['employeeCpf'],
                    deskDescription: desk.data()['description'],
                    concluded: changes.doc.data()['concluded'],
                    startDate: changes.doc.data()['startDate'],
                    startHour: changes.doc.data()['startHour'],
                    endDate: changes.doc.data()['endDate'],
                    endHour: changes.doc.data()['endHour']
                  }
                }
              })
            })
          })
        })
        return ref
      })
    return orders
  }

  async getGainsSum() {
    return this.firestore.collection(BUSINESS_COLLECTION).doc(this.storage.get(USER_INFO).businessCnpj)
      .collection(GAINS_COLLECTION)
  }
  async getExpensesSum() {
    return this.firestore.collection(BUSINESS_COLLECTION).doc(this.storage.get(USER_INFO).businessCnpj)
      .collection(EXPENSES_COLLECTION)
  }
}
