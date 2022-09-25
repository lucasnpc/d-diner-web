import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BusinessStorage } from 'src/app/core/utils/business-storage';
import { DASHBOARD_ROUTE, KITCHEN_ROUTE, USER_INFO } from 'src/app/core/utils/constants';
import { User } from '../../models/usuario.model';
import { LoginService } from '../../services/login.service';

@Component({
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.less'],
})
export class LoginPage implements OnInit {
  constructor(private rest: LoginService, private router: Router,
    private storage: BusinessStorage) { }

  ngOnInit(): void { }

  logarSistema(login: User) {
    this.rest.authUser(login).then(doc => {
      doc.get().then(info => {
        this.storage.set(USER_INFO, info.data())
        switch (info.data()?.role) {
          case 'Administrador':
            this.router.navigate([DASHBOARD_ROUTE]);
            break;
          case 'Cozinha':
            this.router.navigate([KITCHEN_ROUTE]);
            break;
        }
      })
    }).catch(exception => {
      console.log(exception);
      alert('Usuário inválido');
    })
  }
}
