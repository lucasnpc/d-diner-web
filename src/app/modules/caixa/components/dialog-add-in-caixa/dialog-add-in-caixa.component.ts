import { Component, Inject, OnInit } from '@angular/core';
import { Validators, UntypedFormBuilder } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Expense } from '../../models/expense.model';
import { CaixaService } from '../../service/caixa.service';

@Component({
  selector: 'rp-dialog-add-in-caixa',
  templateUrl: './dialog-add-in-caixa.component.html',
  styleUrls: ['./dialog-add-in-caixa.component.less'],
})
export class DialogAddInCaixaComponent implements OnInit {
  formRegisterExpenses = this.fb.group({
    description: ['', Validators.required],
    value: ['', Validators.required],
    expenseDate: ['', Validators.required]
  });
  isEditting = false

  constructor(
    private fb: UntypedFormBuilder,
    private rest: CaixaService,
    public dialogRef: MatDialogRef<DialogAddInCaixaComponent>,
    dateAdapter: DateAdapter<any>,
    @Inject(MAT_DIALOG_DATA) public data: Expense
  ) {
    dateAdapter.setLocale('pt-br');
  }

  ngOnInit(): void {
    if (this.data.id != undefined)
      this.isEditting = true
  }

  sendExpense(edit: boolean) {
    var dados: Expense = {
      id: this.data.id,
      description: this.formRegisterExpenses.get('description')!.value,
      value: this.formRegisterExpenses.get('value')!.value,
      expenseDate: this.formRegisterExpenses.get('expenseDate')!.value,
    };

    edit ? this.updateExpense(dados) : this.addExpense(dados)

  }

  addExpense(expense: Expense) {
    this.rest.postExpense(expense).then(() => this.dialogRef.close(true)).catch(e => alert(e));
  }

  updateExpense(expense: Expense) {
    this.rest.updateExpense(expense).then(() => this.dialogRef.close(true)).catch(e => alert(e));
  }
}
