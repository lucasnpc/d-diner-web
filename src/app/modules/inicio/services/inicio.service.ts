import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { MenuItem } from '../../cardapio/models/menu-item.model';
import { Order } from '../../dashboard/models/order.model';
import { ClientOrder } from '../models/ClientOrder.model';
import { ClientOrdersItems } from '../models/OrderMenuItem.model';

const get = environment.url + 'itens/getItem';
const getMesasOcupadas = environment.url + 'inicio/getMesasOcupadas'
const getPedidosClienteComPedidoId = environment.url + 'inicio/getPedidosClienteComPedidoId';
const getItensComPedidoClienteId = environment.url + 'inicio/getItensComPedidoClienteId';
const postPedido = environment.url + 'inicio/postPedido'
const postPedidoCliente = environment.url + 'inicio/postPedidoCliente'
const postItensPedidosCliente = environment.url + 'inicio/postItensPedidosCliente'
const updatePedidoItens = environment.url + 'inicio/updatePedidoItens'
@Injectable({
  providedIn: 'root'
})
export class InicioService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private httpClient: HttpClient) { }

  public getItems(cnpj: string) {
    return this.httpClient.get<{ data: MenuItem[] }>(get, { params: { businessCnpj: cnpj } });
  }

  public getOccupiedDesks(cnpj: string) {
    return this.httpClient.get<{ data: any[] }>(getMesasOcupadas, { params: { businessCnpj: cnpj } })
  }

  public getClientOrdersWithOrderId(id: string) {
    return this.httpClient.get<{ data: any[] }>(getPedidosClienteComPedidoId, { params: { orderId: id } });
  }
  public getItemsWithClientOrderId(id: string) {
    return this.httpClient.get<{ data: MenuItem[] }>(getItensComPedidoClienteId, { params: { clientOrderId: id } });
  }

  public postOrder(order: Order) {
    return this.httpClient.post<any>(postPedido, order, this.httpOptions)
  }

  public postClientOrder(clientOrder: ClientOrder) {
    return this.httpClient.post<any>(postPedidoCliente, clientOrder, this.httpOptions)
  }

  public postClientOrdersItems(clientOrdersItems: ClientOrdersItems) {
    return this.httpClient.post<any>(postItensPedidosCliente, clientOrdersItems, this.httpOptions)
  }

  public updateOrderMenuItems(orderMenuItems: any) {
    return this.httpClient.post<any>(updatePedidoItens, orderMenuItems, this.httpOptions)
  }
}
