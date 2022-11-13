import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { datePipe, MY_DATE_FORMATS, SAVE_DATE_FORMAT } from 'src/app/core/utils/constants';
import { DashboardService } from '../../service/dashboard.service';

@Component({
  selector: 'rp-gains',
  templateUrl: './gains.component.html',
  styleUrls: ['./gains.component.less'],
  providers: [
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS }
  ]
})

export class GainsComponent implements OnInit {

  gainsStructure: { [key: number]: number } = { 0: 0 }
  expensesStructure: { [key: number]: number } = { 0: 0 }
  gains = 0;
  expenses = 0;
  @Input() selectedDate: Date = new Date()
  @Output() changedDate = new EventEmitter<Date>()

  constructor(private rest: DashboardService) { }

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
    const dateConverted = datePipe.transform(this.selectedDate, SAVE_DATE_FORMAT)
    this.rest.getGainsSum().then(result => {
      result.ref.where('gainDate', '==', dateConverted).onSnapshot(snapshot => {
        snapshot.docChanges().forEach(changes => {
          if (changes.type == 'added') {
            this.gainsStructure[changes.newIndex] = Number(changes.doc.data()['value'])
          }
        })
        this.gains = Object.values(this.gainsStructure).reduce((acc, value) => acc + value)
      })
    })
  }

  getTotalExpenses() {
    const dateConverted = datePipe.transform(this.selectedDate, SAVE_DATE_FORMAT)
    this.rest.getExpensesSum().then(result => {
      result.ref.where('expenseDate', '==', dateConverted).onSnapshot(snapshot => {
        snapshot.docChanges().forEach(changes => {
          if (changes.type == 'added') {
            this.expensesStructure[changes.newIndex] = Number(changes.doc.data()['value'])
          }
        })
        this.expenses = Object.values(this.expensesStructure).reduce((acc, value) => acc + value)
      })
    })
  }
}
