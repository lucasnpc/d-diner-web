import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { BusinessStorage } from 'src/app/core/utils/business-storage';
import { Gain } from '../../models/gain.model';
import { CaixaService } from '../../service/caixa.service';

@Component({
  selector: 'rp-list-entradas',
  templateUrl: './list-entradas.component.html',
  styleUrls: ['./list-entradas.component.less'],
  providers: [DatePipe]
})
export class ListEntradasComponent implements OnInit {
  entradas: Gain[];
  dataSource: any;
  clickedRow: Gain;

  constructor(private rest: CaixaService, private storage: BusinessStorage) { }

  ngOnInit(): void {
    this.rest.getGains(this.storage.get("businessCnpj")).subscribe((result) => {
      this.entradas = result.data;
      this.dataSource = new MatTableDataSource(this.entradas);
    });
  }
  displayedColumns: string[] = ['N. Mesa', 'Valor Conta', 'Forma de pagamento'];

  setRow(row: Gain) {
    this.clickedRow = row;
  }
}
