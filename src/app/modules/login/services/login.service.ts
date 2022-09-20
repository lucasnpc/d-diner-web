import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { User } from '../models/usuario.model';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { USERS_COLLECTION } from 'src/app/core/utils/firestore-keys';
import { BusinessStorage } from 'src/app/core/utils/business-storage';
import { USER_INFO } from 'src/app/core/utils/constants';

@Injectable()
export class LoginService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private auth: AngularFireAuth, private firestore: AngularFirestore, private storage: BusinessStorage) { }

  public async authUser(login: User) {
    const result = await this.auth.signInWithEmailAndPassword(login.email, login.password);
    if (result.user) {
      this.firestore.collection(USERS_COLLECTION).doc(result.user.email!).get().subscribe(doc => {
        if (doc.exists) {
          this.storage.set(USER_INFO, doc.data());
        }
      });
    }
  }
}
