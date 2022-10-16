import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Expense } from '../../models/expense.model';
import { CaixaService } from '../../service/caixa.service';
import { DialogAddInCaixaComponent } from '../dialog-add-in-caixa/dialog-add-in-caixa.component';

@Component({
  selector: 'rp-add-expense',
  templateUrl: './add-expense.component.html',
  styleUrls: ['./add-expense.component.less'],
})
export class AddExpenseComponent implements OnInit {
  formRegisterExpenses = this.fb.group({
    description: ['', Validators.required],
    value: ['', Validators.required],
    expenseDate: ['', Validators.required]
  });

  constructor(
    private fb: UntypedFormBuilder,
    private rest: CaixaService,
    public dialogRef: MatDialogRef<DialogAddInCaixaComponent>) { }

  ngOnInit(): void { }

  addExpense() {
    var dados: Expense = {
      id: '',
      description: this.formRegisterExpenses.get('description')!.value,
      value: this.formRegisterExpenses.get('value')!.value,
      expenseDate: this.formRegisterExpenses.get('expenseDate')!.value,
    };
    this.rest.postExpense(dados).then(() => {
      this.dialogRef.close(true);
    }).catch(e => { alert(e); console.log(e) });
  }
}
