import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { BusinessStorage } from 'src/app/core/utils/business-storage';
import { USER_INFO } from 'src/app/core/utils/constants';
import { USERS_COLLECTION } from 'src/app/core/utils/firestore-keys';
import { User } from '../../models/usuario.model';
import { LoginService } from '../../services/login.service';

@Component({
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.less'],
})
export class LoginPage implements OnInit {
  constructor(private rest: LoginService, private router: Router,
    private auth: AngularFireAuth, private firestore: AngularFirestore) { }

  ngOnInit(): void { }

  logarSistema(login: User) {
    this.auth.signInWithEmailAndPassword(login.email, login.password).then(() => {
      this.auth.authState.subscribe(user => {
        if (user) {
          this.firestore.collection(USERS_COLLECTION).doc(user.email?.toString()).get().subscribe(doc => {
            if (doc.exists) {
              localStorage.setItem(USER_INFO, JSON.stringify(doc.data()))
              const userRole = JSON.parse(localStorage.getItem(USER_INFO)!).role;
              if (userRole === 'Administrador') {
                this.router.navigate(['/menu/dashboard']);
                return
              }
              this.router.navigate(['menu/inicio'])
            }
          })
        }
      })
    }).catch(exception => {
      console.log(exception);
      alert('Usuário inválido');
    })
  }
}
