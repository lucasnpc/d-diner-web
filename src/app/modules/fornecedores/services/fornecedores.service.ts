import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { BusinessStorage } from 'src/app/core/utils/business-storage';
import { USER_INFO } from 'src/app/core/utils/constants';
import { BUSINESS_COLLECTION, PROVIDERS_COLLECTION } from 'src/app/core/utils/firestore-keys';
import { Provider } from '../models/provider.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

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

  constructor(private firestore: AngularFirestore, private storage: BusinessStorage) {
    this.providers = this.firestore.collection(BUSINESS_COLLECTION).doc(this.storage.get(USER_INFO).businessCnpj)
      .collection(PROVIDERS_COLLECTION, ref => ref.where('decommissioned', '==', false)).snapshotChanges().pipe(
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

  async postProvider(provider: Provider) {
    this.firestore.collection(BUSINESS_COLLECTION).doc(this.storage.get(USER_INFO).businessCnpj).collection(PROVIDERS_COLLECTION)
      .doc(provider.idCnpj).set(({
        city: provider.city,
        corporateName: provider.corporateName,
        decommissioned: provider.decommissioned,
        district: provider.district,
        email: provider.email,
        number: provider.number,
        phone: provider.phone,
        state: provider.state,
        street: provider.street,
      }))
  }

  async updateProvider(provider: Provider) {
    this.firestore.collection(BUSINESS_COLLECTION).doc(this.storage.get(USER_INFO).businessCnpj).collection(PROVIDERS_COLLECTION)
      .doc(provider.idCnpj).update(({
        city: provider.city,
        corporateName: provider.corporateName,
        decommissioned: provider.decommissioned,
        district: provider.district,
        email: provider.email,
        number: provider.number,
        phone: provider.phone,
        state: provider.state,
        street: provider.street,
      }))
  }

  async disableProvider(providerCnpj: string) {
    this.firestore.collection(BUSINESS_COLLECTION).doc(this.storage.get(USER_INFO).businessCnpj).collection(PROVIDERS_COLLECTION)
      .doc(providerCnpj).update(({
        decommissioned: true,
      }))
  }
}
