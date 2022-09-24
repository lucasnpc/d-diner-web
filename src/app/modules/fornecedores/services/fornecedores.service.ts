import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { BusinessStorage } from 'src/app/core/utils/business-storage';
import { USER_INFO } from 'src/app/core/utils/constants';
import { BUSINESS_COLLECTION, PROVIDERS_COLLECTION } from 'src/app/core/utils/firestore-keys';
import { environment } from 'src/environments/environment';
import { Provider } from '../models/provider.model';

const postFornecedor = environment.url + 'fornecedores/postFornecedor'
const putFornecedor = environment.url + 'fornecedores/putFornecedor'
const deleteFornecedor = environment.url + 'fornecedores/deleteFornecedor'

@Injectable({
  providedIn: 'root'
})
export class ProvidersService {


  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private httpClient: HttpClient, private firestore: AngularFirestore, private storage: BusinessStorage) { }

  async getProviders() {
    var providers: Provider[] = []
    this.firestore.collection(BUSINESS_COLLECTION).doc(this.storage.get(USER_INFO).businessCnpj)
      .collection(PROVIDERS_COLLECTION, ref => {
        ref.onSnapshot(snapshot => {
          snapshot.docChanges().forEach(changes => {
            if (changes.type == 'added') {
              providers.push({
                idCnpj: changes.doc.id,
                city: changes.doc.data()['city'],
                corporateName: changes.doc.data()['corporateName'],
                decommissioned: changes.doc.data()['decommissioned'],
                district: changes.doc.data()['district'],
                email: changes.doc.data()['email'],
                number: changes.doc.data()['number'],
                phone: changes.doc.data()['phone'],
                state: changes.doc.data()['state'],
                street: changes.doc.data()['street'],
              })
            }
            if (changes.type == 'modified') {
              const index = providers.findIndex(index => index.idCnpj == changes.doc.id)
              providers[index] = {
                idCnpj: changes.doc.id,
                city: changes.doc.data()['city'],
                corporateName: changes.doc.data()['corporateName'],
                decommissioned: changes.doc.data()['decommissioned'],
                district: changes.doc.data()['district'],
                email: changes.doc.data()['email'],
                number: changes.doc.data()['number'],
                phone: changes.doc.data()['phone'],
                state: changes.doc.data()['state'],
                street: changes.doc.data()['street'],
              }
            }
            if (changes.type == 'removed') {
              const index = providers.findIndex(index => index.idCnpj == changes.doc.id)
              providers.splice(index, 1)
            }
          })
        })
        return ref
      })
    return providers
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
