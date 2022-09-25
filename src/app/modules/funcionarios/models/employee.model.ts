export interface Employee {
  idCpf: string
  name: string
  street: string
  number: string
  district: string
  city: string
  phone: string
  admissionDate: string
  birthDate: string
  terminationDate: string | undefined;
  salary: number
  isOutsource: boolean
  isActive: boolean
}
