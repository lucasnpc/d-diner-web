import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Client } from '../models/client.model';

const getClientes = environment.url + 'clientes/getClientes';
const postCliente = environment.url + 'clientes/postCliente';
const putCliente = environment.url + 'clientes/putCliente';
const deleteCliente = environment.url + 'clientes/deleteCliente';

@Injectable()
export class ClienteService {


  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private httpClient: HttpClient) { }

  getCustomers(cnpj: string) {
    return this.httpClient.get<{ data: Client[] }>(getClientes, { params: { businessCnpj: cnpj } });
  }
  postCustomer(client: Client) {
    return this.httpClient.post<any>(
      postCliente,
      client,
      this.httpOptions
    );
  }
  updateCustomer(client: Client) {
    return this.httpClient.put<any>(
      putCliente,
      client,
      this.httpOptions
    );
  }
  deleteCustomer(clientId: any) {
    return this.httpClient.delete<any>(deleteCliente, { params: { id: clientId } })
  }
}
