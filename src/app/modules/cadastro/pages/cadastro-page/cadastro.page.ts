import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/modules/login/models/usuario.model';
import { Business } from '../../models/negocio.model';
import { CadastroService } from '../../service/cadastro.service';

@Component({
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.less'],
})
export class CadastroPage implements OnInit {

  formBusinessRegister = this.fb.group({
    nomeNegocio: ['', Validators.required],
    cnpjNegocio: ['', Validators.required],
    ruaNegocio: ['', Validators.required],
    numeroNegocio: ['', Validators.required],
    bairroNegocio: ['', Validators.required],
    cidadeNegocio: ['', Validators.required],
    estadoNegocio: ['', Validators.required],
  });
  formUserRegister = this.fb.group({
    userName: ['', Validators.required],
    password: ['', Validators.required],
    confirmPassword: ['', Validators.required],
  });

  usuario: User | undefined;
  negocio: Business | undefined;

  constructor(
    private fb: FormBuilder,
    private service: CadastroService,
    private router: Router
  ) { }

  ngOnInit(): void { }

  setBusiness() {
    if (this.formBusinessRegister != null) {
      this.negocio = {
        corporateName: this.formBusinessRegister.get('nomeNegocio')!.value,
        cnpj: this.formBusinessRegister.get('cnpjNegocio')!.value,
        street: this.formBusinessRegister.get('ruaNegocio')!.value,
        number: this.formBusinessRegister.get('numeroNegocio')!.value,
        district: this.formBusinessRegister.get('bairroNegocio')!.value,
        city: this.formBusinessRegister.get('cidadeNegocio')!.value,
        state: this.formBusinessRegister.get('estadoNegocio')!.value,
      };
    }
  }

  setUser() {
    if (this.formUserRegister != null) {
      this.usuario = {
        email: this.formUserRegister.get('userName')!.value,
        businessCnpj: this.negocio!.cnpj,
        password: this.formUserRegister.get('password')!.value,
        userType: 'Administrador',
      };
    }
  }

  finishRegistration() {
    try {
      this.service.postBusiness(this.negocio!).subscribe((result) => {
        if (result.success) {
          this.service.postUser(this.usuario!).subscribe((result) => {
            if (result.success) {
              alert('Negócio e usuário cadastrado');
              this.router.navigate(['']);
            }
          });
        }
      });
    } catch (error) {
      console.log(error);
      alert("Algum erro inesperado aconteceu")
    }
  }

}
