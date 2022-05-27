import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { BusinessStorage } from 'src/app/core/utils/business-storage';
import { DialogAddInCardapioComponent } from '../../components/dialog-add-in-cardapio/dialog-add-in-cardapio.component';
import { MenuItem } from '../../models/menu-item.model';
import { CardapioService } from '../../service/menu.service';

@Component({
  templateUrl: './cardapio.page.html',
  styleUrls: ['./cardapio.page.less']
})
export class CardapioPage implements OnInit {
  filterEvent: Event | undefined;
  filterValue: String = '';
  items: MenuItem[] = [];
  clickedRow: MenuItem | undefined;
  dataSource: any;

  displayedColumns: string[] = [
    'description',
    'price'
  ]

  constructor(private dialog: MatDialog, private rest: CardapioService, private storage: BusinessStorage) { }

  ngOnInit(): void {
    this.getItems()
  }

  ngOnChanges() {
    if (this.filterEvent != null) this.applyFilter(this.filterEvent);
  }

  getItems() {
    this.rest.getItens(this.storage.get("businessCnpj")).subscribe((result) => {
      this.items = result.data;
      this.dataSource = new MatTableDataSource(this.items)
    });
  }

  openDialog() {
    const dialogRef = this.dialog.open(DialogAddInCardapioComponent)

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
}
