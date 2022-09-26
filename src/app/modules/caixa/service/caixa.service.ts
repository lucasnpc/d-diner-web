import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Gain } from '../models/gain.model';
import { Expense } from '../models/expense.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { BusinessStorage } from 'src/app/core/utils/business-storage';
import { BUSINESS_COLLECTION, EXPENSES_COLLECTION, GAINS_COLLECTION } from 'src/app/core/utils/firestore-keys';
import { USER_INFO } from 'src/app/core/utils/constants';

const postEntrada = environment.url + 'caixa/postEntrada';
const postSaida = environment.url + 'caixa/postSaida';

@Injectable()
export class CaixaService {

  gains: Observable<Gain[]>
  expensses: Observable<Expense[]>

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private httpClient: HttpClient, private firestore: AngularFirestore, private storage: BusinessStorage) {
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
        value: c.payload.doc.data()['value']
      }))))
  }

  getGains() {
    return this.gains
  }
  getExpenses() {
    return this.expensses
  }
  postGain(gain: Gain) {
    return this.httpClient.post<any>(
      postEntrada,
      gain,
      this.httpOptions
    );
  }
  postExpense(saida: any) {
    return this.httpClient.post<any>(postSaida, saida, this.httpOptions);
  }
}
