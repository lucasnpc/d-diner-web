import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { BUSINESS_COLLECTION, USERS_COLLECTION } from 'src/app/core/utils/firestore-keys';
import { User } from '../../login/models/usuario.model';
import { Business } from '../models/negocio.model';

@Injectable()
export class CadastroService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private auth: AngularFireAuth, private firestore: AngularFirestore) { }

  postBusiness(business: Business) {
    this.firestore.collection(BUSINESS_COLLECTION).doc(business.idCnpj).set(({
      city: business.city,
      corporateName: business.corporateName,
      district: business.district,
      number: business.number,
      state: business.state,
      street: business.street
    }))
  }
  
  postUser(user: User) {
    this.auth.createUserWithEmailAndPassword(user.email, user.password)
    this.firestore.collection(USERS_COLLECTION).doc(user.email).set({
      businessCnpj: user.businessCnpj,
      role: user.role
    })
  }
}
