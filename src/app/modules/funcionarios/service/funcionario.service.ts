import { DatePipe } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Employee } from '../models/employee.model';

const getFuncionarios = environment.url + 'funcionarios/getFuncionarios';
const postFuncionario = environment.url + 'funcionarios/postFuncionario';
const putFuncionario = environment.url + 'funcionarios/putFuncionario'
const deleteFuncionario = environment.url + 'funcionarios/deleteFuncionario'

@Injectable()
export class FuncionarioService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private httpClient: HttpClient) { }

  getEmployees(cnpj: string) {
    return this.httpClient.get<{ data: Employee[] }>(getFuncionarios, { params: { businessCnpj: cnpj } });
  }
  postEmployee(employee: Employee) {
    return this.httpClient.post<any>(
      postFuncionario,
      employee,
      this.httpOptions
    );
  }

  updateEmployee(employee: Employee) {
    return this.httpClient.put<any>(putFuncionario, employee, this.httpOptions)
  }

  unactivateEmployee(cpf: string) {
    const pipe = new DatePipe('en-US')
    return this.httpClient.delete<any>(deleteFuncionario, { params: { id: cpf, date: pipe.transform(Date.now(), 'yyyy-MM-dd') } })
  }
}
