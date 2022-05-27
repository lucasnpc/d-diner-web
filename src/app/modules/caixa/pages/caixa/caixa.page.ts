import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddInCaixaComponent } from '../../components/dialog-add-in-caixa/dialog-add-in-caixa.component';

@Component({
  templateUrl: './caixa.page.html',
  styleUrls: ['./caixa.page.less'],
})
export class CaixaPage implements OnInit {
  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {}

  openDialog() {
    const dialogRef = this.dialog.open(DialogAddInCaixaComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog caixa result: ${result}`);
    });
  }
}
