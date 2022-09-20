import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BusinessStorage } from 'src/app/core/utils/business-storage';
import { USER_INFO } from 'src/app/core/utils/constants';
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
    this.rest.authUser(login).then(() => {
      const userRole = this.storage.get(USER_INFO).role;
      if (userRole === 'Administrador') {
        this.router.navigate(['/menu/dashboard']);
        return
      }
      this.router.navigate(['menu/inicio'])
    }).catch(exception => {
      console.log(exception);
      alert('Usuário inválido');
    })
  }
}
