import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { User } from '../models/usuario.model';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { USERS_COLLECTION } from 'src/app/core/utils/firestore-keys';
import { BusinessStorage } from 'src/app/core/utils/business-storage';
import { UserInfo } from '../models/user-info.model';

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
    return this.firestore.collection(USERS_COLLECTION).doc<UserInfo>(result.user?.email!).ref
  }

  public logoutUser() {
    this.auth.signOut();
    this.storage.clear();
  }
}
