import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const getPedidosEnviados = environment.url + 'cozinha/getPedidosEnviados'

const updatePedidoStatus = environment.url + 'cozinha/updatePedidoStatus'

@Injectable({
  providedIn: 'root'
})
export class KitchenService {


  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private httpClient: HttpClient) { }

  getSentClientOrders(cnpj: string) {
    return this.httpClient.get<{ data: any[] }>(getPedidosEnviados, { params: { businessCnpj: cnpj } });
  }

  updateOrderStatus(id: any) {
    return this.httpClient.put<any>(updatePedidoStatus, id, this.httpOptions)
  }
}
