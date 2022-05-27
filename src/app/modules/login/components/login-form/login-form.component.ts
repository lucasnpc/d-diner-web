import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../../models/usuario.model';

@Component({
  selector: 'rp-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.less'],
})
export class LoginFormComponent implements OnInit {
  @Output() entrar = new EventEmitter<User>();
  @Output() cadastrar = new EventEmitter<Boolean>();

  loginForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      usuario: [{ value: '', disabled: false }, [Validators.required]],
      senha: [{ value: '', disabled: false }, [Validators.required]],
    });
  }

  ngOnInit(): void { }

  submitLogin() {
    var dados: User = {
      email: this.loginForm.get('usuario')!.value,
      businessCnpj: '',
      password: this.loginForm.get('senha')!.value,
      userType: '',
    };
    this.entrar.emit(dados);
  }
}
