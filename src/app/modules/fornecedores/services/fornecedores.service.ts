import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Provider } from '../models/provider.model';

const getFornecedores = environment.url + 'fornecedores/getFornecedores';
const postFornecedor = environment.url + 'fornecedores/postFornecedor'
const putFornecedor = environment.url + 'fornecedores/putFornecedor'
const deleteFornecedor = environment.url + 'fornecedores/deleteFornecedor'

@Injectable({
  providedIn: 'root'
})
export class ProvidersService {


  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private httpClient: HttpClient) { }

  getProviders(cnpj: string) {
    return this.httpClient.get<{ data: Provider[] }>(getFornecedores, { params: { businessCnpj: cnpj } });
  }

  postProvider(provider: Provider) {
    return this.httpClient.post<any>(postFornecedor, provider, this.httpOptions)
  }

  updateProvider(provider: Provider) {
    return this.httpClient.put<any>(putFornecedor, provider, this.httpOptions)
  }

  disableProvider(providerCnpj: string) {
    return this.httpClient.delete<any>(deleteFornecedor, { params: { id: providerCnpj } });
  }
}
