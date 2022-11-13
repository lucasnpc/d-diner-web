import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gain } from '../models/gain.model';
import { Expense } from '../models/expense.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { BusinessStorage } from 'src/app/core/utils/business-storage';
import { BUSINESS_COLLECTION, EXPENSES_COLLECTION, GAINS_COLLECTION } from 'src/app/core/utils/firestore-keys';
import { datePipe, SAVE_DATE_FORMAT, USER_INFO } from 'src/app/core/utils/constants';


@Injectable()
export class CaixaService {

  gains: Observable<Gain[]>
  expensses: Observable<Expense[]>

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private firestore: AngularFirestore, private storage: BusinessStorage) {
    this.gains = firestore.collection(BUSINESS_COLLECTION).doc(storage.get(USER_INFO).businessCnpj).collection(GAINS_COLLECTION)
      .snapshotChanges().pipe(map(changes => changes.map(c => ({
        id: c.payload.doc.id,
        value: c.payload.doc.data()['value'],
        paymentWay: c.payload.doc.data()['paymentWay'],
        gainDate: c.payload.doc.data()['gainDate'],
        additionalValue: c.payload.doc.data()['additionalValue'],
      }))))

    this.expensses = firestore.collection(BUSINESS_COLLECTION).doc(storage.get(USER_INFO).businessCnpj).collection(EXPENSES_COLLECTION)
      .snapshotChanges().pipe(map(changes => changes.map(c => ({
        id: c.payload.doc.id,
        description: c.payload.doc.data()['description'],
        expenseDate: c.payload.doc.data()['expenseDate'],
        responsibleName: c.payload.doc.data()['responsibleName'],
        value: c.payload.doc.data()['value']
      }))))
  }

  getGains() {
    return this.gains
  }

  getExpenses() {
    return this.expensses
  }

  getGainsByDate(date: string) {
    return this.firestore.collection(BUSINESS_COLLECTION).doc(this.storage.get(USER_INFO).businessCnpj)
      .collection(GAINS_COLLECTION, ref => ref.where('gainDate', '==', date)).get()
  }

  getExpensesByDate(date: string) {
    return this.firestore.collection(BUSINESS_COLLECTION).doc(this.storage.get(USER_INFO).businessCnpj)
      .collection(EXPENSES_COLLECTION, ref => ref.where('expenseDate', '==', date)).get()
  }

  async postGain(gain: Gain) {
    return this.firestore.collection(BUSINESS_COLLECTION).doc(this.storage.get(USER_INFO).businessCnpj)
      .collection(GAINS_COLLECTION).add(({
        additionalValue: gain.additionalValue,
        gainDate: gain.gainDate,
        paymentWay: gain.paymentWay,
        value: gain.value
      }))
  }

  async postExpense(expense: Expense) {
    return this.firestore.collection(BUSINESS_COLLECTION).doc(this.storage.get(USER_INFO).businessCnpj)
      .collection(EXPENSES_COLLECTION).add(({
        description: expense.description,
        expenseDate: datePipe.transform(expense.expenseDate, SAVE_DATE_FORMAT),
        responsibleName: this.storage.get(USER_INFO).name,
        value: expense.value
      }))
  }

  async updateExpense(expense: Expense) {
    return this.firestore.collection(BUSINESS_COLLECTION).doc(this.storage.get(USER_INFO).businessCnpj)
      .collection(EXPENSES_COLLECTION).doc(expense.id).update(({
        description: expense.description,
        expenseDate: datePipe.transform(expense.expenseDate, SAVE_DATE_FORMAT),
        value: expense.value
      }))
  }

  async deleteExpense(id: string) {
    return this.firestore.collection(BUSINESS_COLLECTION).doc(this.storage.get(USER_INFO).businessCnpj)
      .collection(EXPENSES_COLLECTION).doc(id).delete()
  }
}
