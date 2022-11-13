export interface User {
  email: string;
  businessCnpj: string;
  cpf: string;
  name: string;
  role: string;

  //Not saved properties
  password: string;
}
