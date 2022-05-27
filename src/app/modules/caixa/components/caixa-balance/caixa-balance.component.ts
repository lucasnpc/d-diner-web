import { Component, OnInit } from '@angular/core';

export interface PeriodicElement {
  total: number;
}

const ELEMENT_DATA: PeriodicElement[] = [{ total: 0 }];

@Component({
  selector: 'rp-caixa-balance',
  templateUrl: './caixa-balance.component.html',
  styleUrls: ['./caixa-balance.component.less'],
})
export class CaixaBalanceComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
  displayedColumns: string[] = ['balance'];
  dataSource = ELEMENT_DATA;
}
