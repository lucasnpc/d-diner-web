import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { SharedDialogComponent } from 'src/app/modules/shared/components/shared-dialog/shared-dialog.component';
import { DialogAddInCardapioComponent } from '../../components/dialog-add-in-cardapio/dialog-add-in-cardapio.component';
import { MenuItem } from '../../models/menu-item.model';
import { MenuService } from '../../service/menu.service';

@Component({
  templateUrl: './cardapio.page.html',
  styleUrls: ['./cardapio.page.less']
})
export class CardapioPage implements OnInit {
  filterEvent: Event | undefined;
  filterValue: String = '';
  clickedRow: MenuItem | undefined;
  dataSource: any;

  displayedColumns: string[] = [
    'description',
    'price'
  ]

  constructor(private dialog: MatDialog, private rest: MenuService) { }

  ngOnInit(): void {
    this.getItems()
  }

  ngOnChanges() {
    if (this.filterEvent != null) this.applyFilter(this.filterEvent);
  }

  getItems() {
    this.rest.getItems().subscribe(result => this.dataSource = new MatTableDataSource(result));
  }

  openDialog(edit: boolean) {
    var dialogRef
    if (edit === true) {
      if (this.clickedRow === undefined) { alert('Selecione um registro para editar!!'); return }
      dialogRef = this.dialog.open(DialogAddInCardapioComponent, {
        data: this.clickedRow
      })
    }
    else {
      dialogRef = this.dialog.open(DialogAddInCardapioComponent, {
        data: {}
      })
    }

    dialogRef.afterClosed().subscribe(result => {
      if (result)
        this.getItems()
    })
  }

  applyFilter(event: Event) {
    this.filterValue = (event.target as HTMLInputElement).value.toString();
    this.dataSource.filter = this.filterValue.trim().toLowerCase();
  }

  setRow(row: MenuItem) {
    this.clickedRow = row;
  }

  openExclusionDialog() {
    if (this.clickedRow === undefined) { alert('Selecione um registro para editar!!'); return }

    const dialogRef = this.dialog.open(SharedDialogComponent)

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.rest.deleteItem(this.clickedRow!.id).catch(e => console.log(e))
      }
    })
  }
}
