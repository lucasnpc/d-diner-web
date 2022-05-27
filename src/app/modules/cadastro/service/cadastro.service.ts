import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from '../../login/models/usuario.model';
import { Business } from '../models/negocio.model';

const postNegocio = environment.url + 'negocios/postNegocio';
const postUsuario = environment.url + 'usuario/postUsuario';

@Injectable()
export class CadastroService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private httpClient: HttpClient) { }

  postBusiness(negocio: Business) {
    return this.httpClient.post<any>(
      postNegocio,
      negocio,
      this.httpOptions
    );
  }
  postUser(usuario: User) {
    return this.httpClient.post<any>(
      postUsuario,
      usuario,
      this.httpOptions
    );
  }
}
