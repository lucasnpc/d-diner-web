import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { BusinessStorage } from 'src/app/core/utils/business-storage';
import { Expense } from '../../models/expense.model';
import { CaixaService } from '../../service/caixa.service';

@Component({
  selector: 'rp-list-saidas',
  templateUrl: './list-saidas.component.html',
  styleUrls: ['./list-saidas.component.less'],
  providers: [DatePipe]
})
export class ListSaidasComponent implements OnInit {
  saidas: Expense[] = [];
  clickedRow: Expense | undefined;
  dataSource: any;

  constructor(private rest: CaixaService, private storage: BusinessStorage) { }

  ngOnInit(): void {
    this.rest.getExpenses().subscribe((result) => {
      this.saidas = result

      this.dataSource = new MatTableDataSource(this.saidas);
    });
  }
  displayedColumns: string[] = ['Descrição', 'Valor', 'Data do gasto'];

  setRow(row: Expense) {
    this.clickedRow = row;
  }
}
