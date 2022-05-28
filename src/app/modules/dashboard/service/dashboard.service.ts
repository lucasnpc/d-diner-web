import { DatePipe } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
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

  constructor(private httpClient: HttpClient) { }

  getTotalOrders(cnpj: string, date: Date) {
    return this.httpClient.get<{ data: Order[] }>(getPedidosTotal, { params: { businessCnpj: cnpj, dateOrder: pipe.transform(date, 'yyyy-MM-dd')! } })
  }

  getActiveOrders(cnpj: string, date: Date) {
    return this.httpClient.get<{ data: Order[] }>(getPedidosAtivos, { params: { businessCnpj: cnpj, dateOrder: pipe.transform(date, 'yyyy-MM-dd')! } })
  }

  getConcludedOrders(cnpj: string, date: Date) {
    return this.httpClient.get<{ data: Order[] }>(getPedidosConcluidos, { params: { businessCnpj: cnpj, dateOrder: pipe.transform(date, 'yyyy-MM-dd')! } })
  }

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
