import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { BusinessStorage } from 'src/app/core/utils/business-storage';
import { DashboardService } from '../../service/dashboard.service';

const datePipe = new DatePipe('pt-BR');

@Component({
  selector: 'rp-gains',
  templateUrl: './gains.component.html',
  styleUrls: ['./gains.component.less'],
})

export class GainsComponent implements OnInit {
  gains = 0;
  expenses = 0;
  @Input() selectedDate: Date = new Date()
  @Output() changedDate = new EventEmitter<Date>()

  constructor(private rest: DashboardService, private storage: BusinessStorage) { }

  ngOnInit(): void {
    this.getTotalGains()
    this.getTotalExpenses()
  }

  ngOnChanges(): void {
    this.getTotalGains()
    this.getTotalExpenses()
  }

  changeDate(date: MatDatepickerInputEvent<Date>) {
    this.changedDate.emit(date.value!)
  }

  getTotalGains() {
    const dateConverted = datePipe.transform(this.selectedDate, "dd 'de' MMMM 'de' yyyy")
    this.rest.getGainsSum().then(result => {
      result.ref.where('gainDate', '==', dateConverted).onSnapshot(snapshot => {
        this.gains = 0
        snapshot.docChanges().forEach(changes => {
          if (changes.type == 'added') {
            this.gains += Number(changes.doc.data()['value'])
          }
        })
      })
    })
  }

  getTotalExpenses() {
    const dateConverted = datePipe.transform(this.selectedDate, "dd 'de' MMMM 'de' yyyy")
    this.rest.getExpensesSum().then(result => {
      result.ref.where('expenseDate', '==', dateConverted).onSnapshot(snapshot => {
        this.expenses = 0
        snapshot.docChanges().forEach(changes => {
          if (changes.type == 'added') {
            this.expenses += Number(changes.doc.data()['value'])
          }
        })
      })
    })
  }
}
