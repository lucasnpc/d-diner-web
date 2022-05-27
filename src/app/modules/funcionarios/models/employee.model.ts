export class Employee {
  cpf: string = '';
  name: string = '';
  street: string = '';
  number: string = '';
  district: string = '';
  city: string = '';
  phone: string = '';
  role: string = '';
  admissionDate: Date = new Date();
  birthDate: Date = new Date();
  terminationDate: Date | undefined;
  salary: number = 0;
  isOutsource: boolean = false;
  isActive: boolean = false;
  businessCnpj: string = '';
}
