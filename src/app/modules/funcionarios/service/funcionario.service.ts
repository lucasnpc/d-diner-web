import { DatePipe } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { BusinessStorage } from 'src/app/core/utils/business-storage';
import { USER_INFO } from 'src/app/core/utils/constants';
import { BUSINESS_COLLECTION, EMPLOYEES_COLLECTION } from 'src/app/core/utils/firestore-keys';
import { environment } from 'src/environments/environment';
import { Employee } from '../models/employee.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

const getFuncionarios = environment.url + 'funcionarios/getFuncionarios';
const postFuncionario = environment.url + 'funcionarios/postFuncionario';
const putFuncionario = environment.url + 'funcionarios/putFuncionario'
const deleteFuncionario = environment.url + 'funcionarios/deleteFuncionario'

@Injectable()
export class FuncionarioService {

  employees: Observable<Employee[]>

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private httpClient: HttpClient, private firestore: AngularFirestore, private storage: BusinessStorage) {
    this.employees = firestore.collection(BUSINESS_COLLECTION).doc(storage.get(USER_INFO).businessCnpj)
      .collection(EMPLOYEES_COLLECTION).snapshotChanges().pipe(
        map(changes => changes.map(c => ({
          idCpf: c.payload.doc.id,
          name: c.payload.doc.data()['name'],
          street: c.payload.doc.data()['street'],
          number: c.payload.doc.data()['number'],
          district: c.payload.doc.data()['district'],
          city: c.payload.doc.data()['city'],
          phone: c.payload.doc.data()['phone'],
          admissionDate: c.payload.doc.data()['admissionDate'],
          birthDate: c.payload.doc.data()['birthDate'],
          terminationDate: c.payload.doc.data()['terminationDate'],
          salary: c.payload.doc.data()['salary'],
          isOutsource: c.payload.doc.data()['isOutsource'],
          isActive: c.payload.doc.data()['isActive']
        })))
      )
  }

  getEmployees() {
    return this.employees
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
    return this.httpClient.delete<any>(deleteFuncionario, { params: { id: cpf, date: pipe.transform(Date.now(), 'yyyy-MM-dd')! } })
  }
}
