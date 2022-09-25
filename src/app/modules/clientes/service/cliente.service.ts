import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Client } from '../models/client.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { BusinessStorage } from 'src/app/core/utils/business-storage';
import { USER_INFO } from 'src/app/core/utils/constants';
import { BUSINESS_COLLECTION, CLIENTS_COLLECTION } from 'src/app/core/utils/firestore-keys';

const getClientes = environment.url + 'clientes/getClientes';
const postCliente = environment.url + 'clientes/postCliente';
const putCliente = environment.url + 'clientes/putCliente';
const deleteCliente = environment.url + 'clientes/deleteCliente';

@Injectable()
export class ClienteService {

  clients: Observable<Client[]>


  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private httpClient: HttpClient, private firestore: AngularFirestore, private storage: BusinessStorage) {
    this.clients = this.firestore.collection(BUSINESS_COLLECTION).doc(this.storage.get(USER_INFO).businessCnpj).collection(CLIENTS_COLLECTION)
      .snapshotChanges().pipe(map(changes => changes.map(c => ({
        id: c.payload.doc.id,
        name: c.payload.doc.data()['name'],
        street: c.payload.doc.data()['street'],
        number: c.payload.doc.data()['number'],
        district: c.payload.doc.data()['district'],
        city: c.payload.doc.data()['city'],
        phone: c.payload.doc.data()['phone']
      }))))
  }

  getCustomers() {
    return this.clients
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
