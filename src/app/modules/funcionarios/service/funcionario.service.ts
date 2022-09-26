import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { BusinessStorage } from 'src/app/core/utils/business-storage';
import { datePipe, SAVE_DATE_FORMAT, USER_INFO } from 'src/app/core/utils/constants';
import { BUSINESS_COLLECTION, EMPLOYEES_COLLECTION } from 'src/app/core/utils/firestore-keys';
import { Employee } from '../models/employee.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class FuncionarioService {

  employees: Observable<Employee[]>

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private firestore: AngularFirestore, private storage: BusinessStorage) {
    this.employees = firestore.collection(BUSINESS_COLLECTION).doc(storage.get(USER_INFO).businessCnpj)
      .collection(EMPLOYEES_COLLECTION, ref => ref.where('isActive', '==', true)).snapshotChanges().pipe(
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
  async postEmployee(employee: Employee) {
    this.firestore.collection(BUSINESS_COLLECTION).doc(this.storage.get(USER_INFO).businessCnpj).collection(EMPLOYEES_COLLECTION)
      .doc(employee.idCpf).set(({
        admissionDate: datePipe.transform(employee.admissionDate, SAVE_DATE_FORMAT),
        birthDate: datePipe.transform(employee.birthDate, SAVE_DATE_FORMAT),
        city: employee.city,
        district: employee.district,
        isActive: employee.isActive,
        isOutsource: employee.isOutsource,
        name: employee.name,
        number: employee.number,
        phone: employee.phone,
        salary: employee.salary,
        street: employee.street
      }))
  }

  async updateEmployee(employee: Employee) {
    this.firestore.collection(BUSINESS_COLLECTION).doc(this.storage.get(USER_INFO).businessCnpj).collection(EMPLOYEES_COLLECTION)
      .doc(employee.idCpf).update(({
        admissionDate: datePipe.transform(employee.admissionDate, SAVE_DATE_FORMAT),
        birthDate: datePipe.transform(employee.birthDate, SAVE_DATE_FORMAT),
        city: employee.city,
        district: employee.district,
        isActive: employee.isActive,
        isOutsource: employee.isOutsource,
        name: employee.name,
        number: employee.number,
        phone: employee.phone,
        salary: employee.salary,
        street: employee.street
      }))
  }

  async unactivateEmployee(cpf: string) {
    this.firestore.collection(BUSINESS_COLLECTION).doc(this.storage.get(USER_INFO).businessCnpj).collection(EMPLOYEES_COLLECTION)
      .doc(cpf).update(({
        isActive: false,
        terminationDate: datePipe.transform(new Date(), SAVE_DATE_FORMAT)
      }))
  }
}
