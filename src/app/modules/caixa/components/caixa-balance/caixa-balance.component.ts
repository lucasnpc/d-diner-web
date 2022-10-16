import { Component, OnInit } from '@angular/core';
import { CaixaService } from '../../service/caixa.service';

@Component({
  selector: 'rp-caixa-balance',
  templateUrl: './caixa-balance.component.html',
  styleUrls: ['./caixa-balance.component.less'],
})
export class CaixaBalanceComponent implements OnInit {
  gainSum = 0
  expenseSum = 0

  displayedColumns: string[] = ['balance'];
  dataSource = [{}];

  constructor(private service: CaixaService) { }

  ngOnInit(): void {
    this.service.getGains().subscribe(r => this.gainSum = r.reduce((sum, obj) => {
      return sum + obj.value
    }, 0))
    this.service.getExpenses().subscribe(r => this.expenseSum = r.reduce((sum, obj) => {
      return sum + obj.value
    }, 0))
  }

}
