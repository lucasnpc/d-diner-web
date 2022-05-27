import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Product } from '../../compras/models/product.model';
import { MenuItem } from '../models/menu-item.model';

const get = environment.url + 'itens/getItem';
const getProdutos = environment.url + 'produtos/getProdutos';

const post = environment.url + 'itens/postItem';
const postProdutoItem = environment.url + 'itens/postProdutoItem'

@Injectable({
  providedIn: 'root'
})
export class CardapioService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private httpClient: HttpClient) { }

  public getItens(cnpj: string) {
    return this.httpClient.get<{ data: MenuItem[] }>(get, { params: { businessCnpj: cnpj } });
  }

  getProducts(cnpj: string) {
    return this.httpClient.get<{ data: Product[] }>(getProdutos, { params: { businessCnpj: cnpj } })
  }

  public postItem(item: any) {
    return this.httpClient.post<any>(post, item, this.httpOptions);
  }
  postMenuItemProduct(productMenuItem: any) {
    return this.httpClient.post<any>(postProdutoItem, productMenuItem, this.httpOptions);
  }
}
