import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../models/usuario.model';
import { environment } from 'src/environments/environment';

const authUsers = environment.url + "usuarios/authUsuarios";

@Injectable()
export class LoginService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private httpClient: HttpClient) {}

  public authUser(login: User){
      return this.httpClient.post<any>(authUsers, login, this.httpOptions);
  }
}
