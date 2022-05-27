export class Order {
    orderId: number | undefined;
    employeeCpf: string | undefined;
    deskDescription: string = '';
    concluded: boolean = false;
    businessCnpj: string = '';
    dateTimeOrder: Date = new Date();
}