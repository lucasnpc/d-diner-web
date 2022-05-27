export class Expense {
  expenseId: number | undefined;
  description: string = '';
  value: number = 0;
  expenseDate: Date = new Date();
  businessCnpj: string = '';
}
