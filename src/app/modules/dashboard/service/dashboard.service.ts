import { DatePipe } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { snapshotChanges } from '@angular/fire/compat/database';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { BusinessStorage } from 'src/app/core/utils/business-storage';
import { USER_INFO } from 'src/app/core/utils/constants';
import { BUSINESS_COLLECTION, DESKS_COLLECTION, ORDERS_COLLECTION } from 'src/app/core/utils/firestore-keys';
import { environment } from 'src/environments/environment';
import { Order } from '../models/order.model';

const getPedidosTotal = environment.url + 'dashboard/getPedidosTotal'
const getPedidosAtivos = environment.url + 'dashboard/getPedidosAtivos';
const getPedidosConcluidos = environment.url + 'dashboard/getPedidosConcluidos'

const getTotalEntradas = environment.url + 'dashboard/getTotalEntradas';
const getTotalSaidas = environment.url + 'dashboard/getTotalSaidas';

const postAtualizaPedidoAtivoConcluido = environment.url + 'dashboard/postAtualizaPedidoAtivoConcluido';

const pipe = new DatePipe('en-US')

@Injectable()
export class DashboardService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private httpClient: HttpClient, private firestore: AngularFirestore, private storage: BusinessStorage) { }

  getBusyDesks() {
    return this.firestore.collection(BUSINESS_COLLECTION).doc(this.storage.get(USER_INFO).businessCnpj)
      .collection(DESKS_COLLECTION, ref => ref.where('isOccupied', "==", true)).get();
  }

  async getConcludedOrders(date: string) {
    var orders: Order[] = []
    this.firestore.collection(BUSINESS_COLLECTION).doc(this.storage.get(USER_INFO).businessCnpj)
      .collection(DESKS_COLLECTION, ref => {
        ref.get().then(desks => {
          desks.docs.forEach(desk => {
            ref.doc(desk.id).collection(ORDERS_COLLECTION).where('concluded', '==', false).onSnapshot(snapshot => {
              snapshot.docChanges().forEach(changes => {
                if (changes.type == 'added') {
                  orders.push({
                    orderId: changes.doc.id,
                    employeeCpf: changes.doc.data()['employeeCpf'],
                    deskDescription: desk.data()['description'],
                    concluded: changes.doc.data()['concluded'],
                    startDate: changes.doc.data()['startDate'],
                    endDate: changes.doc.data()['endDate']
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
                    endDate: changes.doc.data()['endDate']
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

  getTotalOrders(cnpj: string, date: Date) {
    return this.httpClient.get<{ data: Order[] }>(getPedidosTotal, { params: { businessCnpj: cnpj, dateOrder: pipe.transform(date, 'yyyy-MM-dd')! } })
  }

  getActiveOrders(cnpj: string, date: Date) {
    return this.httpClient.get<{ data: Order[] }>(getPedidosAtivos, { params: { businessCnpj: cnpj, dateOrder: pipe.transform(date, 'yyyy-MM-dd')! } })
  }

  // getConcludedOrders(cnpj: string, date: Date) {
  //   return this.httpClient.get<{ data: Order[] }>(getPedidosConcluidos, { params: { businessCnpj: cnpj, dateOrder: pipe.transform(date, 'yyyy-MM-dd')! } })
  // }

  getTotalGains(cnpj: string, date: Date) {
    return this.httpClient.get<{ data: number }>(getTotalEntradas, { params: { businessCnpj: cnpj, dateGain: pipe.transform(date, 'yyyy-MM-dd')! } });
  }

  getTotalExpenses(cnpj: string, date: Date) {
    return this.httpClient.get<{ data: number }>(getTotalSaidas, { params: { businessCnpj: cnpj, dateExpense: pipe.transform(date, 'yyyy-MM-dd')! } });
  }

  updateActiveOrderToConcluded(id: any) {
    return this.httpClient.post<any>(postAtualizaPedidoAtivoConcluido, id, this.httpOptions)
  }

}
