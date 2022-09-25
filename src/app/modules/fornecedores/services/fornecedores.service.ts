import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { BusinessStorage } from 'src/app/core/utils/business-storage';
import { USER_INFO } from 'src/app/core/utils/constants';
import { BUSINESS_COLLECTION, PROVIDERS_COLLECTION } from 'src/app/core/utils/firestore-keys';
import { environment } from 'src/environments/environment';
import { Provider } from '../models/provider.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

const postFornecedor = environment.url + 'fornecedores/postFornecedor'
const putFornecedor = environment.url + 'fornecedores/putFornecedor'
const deleteFornecedor = environment.url + 'fornecedores/deleteFornecedor'

@Injectable({
  providedIn: 'root'
})
export class ProvidersService { 

  providers: Observable<Provider[]>

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private httpClient: HttpClient, private firestore: AngularFirestore, private storage: BusinessStorage) {
    this.providers = this.firestore.collection(BUSINESS_COLLECTION).doc(this.storage.get(USER_INFO).businessCnpj)
      .collection(PROVIDERS_COLLECTION).snapshotChanges().pipe(
        map(changes => changes.map(c => ({
          idCnpj: c.payload.doc.id,
          city: c.payload.doc.data()['city'],
          corporateName: c.payload.doc.data()['corporateName'],
          decommissioned: c.payload.doc.data()['decommissioned'],
          district: c.payload.doc.data()['district'],
          email: c.payload.doc.data()['email'],
          number: c.payload.doc.data()['number'],
          phone: c.payload.doc.data()['phone'],
          state: c.payload.doc.data()['state'],
          street: c.payload.doc.data()['street'],
        })))
      )
  }

  getProviders() {
    return this.providers
  }



  postProvider(provider: Provider) {
    return this.httpClient.post<any>(postFornecedor, provider, this.httpOptions)
  }

  updateProvider(provider: Provider) {
    return this.httpClient.put<any>(putFornecedor, provider, this.httpOptions)
  }

  disableProvider(providerCnpj: string) {
    return this.httpClient.delete<any>(deleteFornecedor, { params: { id: providerCnpj } });
  }
}
