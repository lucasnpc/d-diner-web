import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Expense } from '../../models/expense.model';
import { CaixaService } from '../../service/caixa.service';

@Component({
  selector: 'rp-list-saidas',
  templateUrl: './list-saidas.component.html',
  styleUrls: ['./list-saidas.component.less']
})
export class ListSaidasComponent implements OnInit {
  clickedRow: Expense | undefined;
  dataSource: any;

  constructor(private rest: CaixaService) { }

  ngOnInit(): void {
    this.rest.getExpenses().subscribe((result) => {
      this.dataSource = new MatTableDataSource(result);
    });
  }
  displayedColumns: string[] = ['Descrição', 'Valor', 'Data do gasto'];

  setRow(row: Expense) {
    this.clickedRow = row;
  }
}
