import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Gain } from '../models/gain.model';
import { Expense } from '../models/expense.model';

const getEntradas = environment.url + 'caixa/getEntradas';
const getSaidas = environment.url + 'caixa/getSaidas';

const postEntrada = environment.url + 'caixa/postEntrada';
const postSaida = environment.url + 'caixa/postSaida';

@Injectable()
export class CaixaService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private httpClient: HttpClient) { }

  getGains(cnpj: string) {
    return this.httpClient.get<{ data: Gain[] }>(getEntradas, { params: { businessCnpj: cnpj } });
  }
  getExpenses(cnpj: string) {
    return this.httpClient.get<{ data: Expense[] }>(getSaidas, { params: { businessCnpj: cnpj } });
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
