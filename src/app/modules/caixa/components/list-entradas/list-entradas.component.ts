import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { datePipe, SHOW_DATE_FORMAT } from 'src/app/core/utils/constants';
import { Gain } from '../../models/gain.model';
import { CaixaService } from '../../service/caixa.service';

@Component({
  selector: 'rp-list-entradas',
  templateUrl: './list-entradas.component.html',
  styleUrls: ['./list-entradas.component.less'],
})
export class ListEntradasComponent implements OnInit {
  dataSource: any;
  clickedRow: Gain | undefined;

  constructor(private rest: CaixaService) { }

  ngOnInit(): void {
    this.rest.getGains().subscribe((result) => {
      this.dataSource = new MatTableDataSource(result);
    });
  }
  displayedColumns: string[] = ['N. Mesa', 'Valor Conta', 'Forma de pagamento'];

  setRow(row: Gain) {
    this.clickedRow = row;
  }

  formatDateString(dateString: string) {
    const [day, month, year] = dateString.split('/');
    return datePipe.transform(new Date(+year, +month - 1, +day), SHOW_DATE_FORMAT)
  }
}
