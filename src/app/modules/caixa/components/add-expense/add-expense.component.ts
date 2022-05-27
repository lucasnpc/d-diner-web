import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { BusinessStorage } from 'src/app/core/utils/business-storage';
import { BUSINESS_CNPJ } from 'src/app/core/utils/constants';
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
    private fb: FormBuilder,
    private rest: CaixaService,
    public dialogRef: MatDialogRef<DialogAddInCaixaComponent>,
    private storage: BusinessStorage
  ) { }

  ngOnInit(): void { }

  addExpense() {
    console.log('Add expense');
    var dados: Expense = {
      expenseId: undefined,
      description: this.formRegisterExpenses.get('description').value,
      value: this.formRegisterExpenses.get('value').value,
      expenseDate: this.formRegisterExpenses.get('expenseDate').value,
      businessCnpj: this.storage.get(BUSINESS_CNPJ)
    };
    this.rest.postExpense(dados).subscribe((result) => {
      if (result.success) this.dialogRef.close(true);
    });
  }
}
