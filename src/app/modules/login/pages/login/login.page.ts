import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BusinessStorage } from 'src/app/core/utils/business-storage';
import { BUSINESS_CNPJ, USER_ROLE } from 'src/app/core/utils/constants';
import { User } from '../../models/usuario.model';
import { LoginService } from '../../services/login.service';

@Component({
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.less'],
})
export class LoginPage implements OnInit {
  constructor(private rest: LoginService, private router: Router, private storage: BusinessStorage) { }

  ngOnInit(): void { }

  logarSistema(login: User) {
    this.rest.authUser(login).subscribe(
      (result) => {
        if (result) {
          this.storage.set(BUSINESS_CNPJ, result.data.businessCnpj)
          this.storage.set(USER_ROLE, result.data.userType)
          if (result.data.userType === 'Administrador') {
            this.router.navigate(['/menu/dashboard']);
            return
          }
          this.router.navigate(['menu/inicio'])
        }
      },
      (error) => {
        console.log(error);
        alert('Usuário inválido');
      }
    );
  }
}
