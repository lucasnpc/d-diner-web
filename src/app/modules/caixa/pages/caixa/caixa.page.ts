import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SharedDialogComponent } from 'src/app/modules/shared/components/shared-dialog/shared-dialog.component';
import { DialogAddInCaixaComponent } from '../../components/dialog-add-in-caixa/dialog-add-in-caixa.component';
import { Expense } from '../../models/expense.model';
import { CaixaService } from '../../service/caixa.service';

@Component({
  templateUrl: './caixa.page.html',
  styleUrls: ['./caixa.page.less'],
})
export class CaixaPage implements OnInit {
  expense: Expense | undefined
  constructor(private dialog: MatDialog, private service: CaixaService) { }

  ngOnInit(): void { }

  openDialog(edit: boolean) {
    var dialogRef
    if (edit === true) {
      if (this.expense === undefined) { alert('Selecione um registro para editar!!'); return }
      dialogRef = this.dialog.open(DialogAddInCaixaComponent, {
        data: ({
          id: this.expense.id,
          description: this.expense.description,
          expenseDate: this.formatToDate(this.expense.expenseDate),
          value: this.expense.value
        })
      })
    }
    else {
      dialogRef = this.dialog.open(DialogAddInCaixaComponent, {
        data: {}
      })
    }
  }

  setExpense(event: Expense) {
    this.expense = event
  }

  openExcludingDialog() {
    if (this.expense === undefined) { alert('Selecione um registro para editar!!'); return }

    const dialogRef = this.dialog.open(SharedDialogComponent)

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.service.deleteExpense(this.expense!.id)
      }
    })
  }

  formatToDate(dateString: string) {
    const [day, month, year] = dateString.split('/');
    return new Date(+year, +month - 1, +day);
  }
}
