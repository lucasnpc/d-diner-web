import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Provider } from '../../fornecedores/models/provider.model';
import { Product } from '../models/product.model';

const getProdutos = environment.url + 'produtos/getProdutos';
const postProduto = environment.url + 'produtos/postProduto';
const postCompra = environment.url + 'compras/postCompra'

const getFornecedores = environment.url + 'fornecedores/getFornecedores';

const updateEstoqueAtualProduto = environment.url + 'produtos/updateEstoqueAtualProduto'
@Injectable()
export class ComprasService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  constructor(private httpClient: HttpClient) { }

  getProducts(cnpj: string) {
    return this.httpClient.get<{ data: Product[] }>(getProdutos, { params: { businessCnpj: cnpj } })
  }

  getProviders(cnpj: string) {
    return this.httpClient.get<{ data: Provider[] }>(getFornecedores, { params: { businessCnpj: cnpj } });
  }

  postProduct(product: Product) {
    return this.httpClient.post<any>(postProduto, product, this.httpOptions)
  }

  postPurchase(purchase: any) {
    return this.httpClient.post<any>(postCompra, purchase, this.httpOptions)
  }

  updateProductCurrentStock(stock: any) {
    return this.httpClient.put(updateEstoqueAtualProduto, stock, this.httpOptions)
  }
}
