import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { BusinessStorage } from 'src/app/core/utils/business-storage';
import { DashboardService } from '../../service/dashboard.service';

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
    this.getTotalGainsNExpenses()
  }

  ngOnChanges() {
    this.getTotalGainsNExpenses()
  }

  changeDate(date: MatDatepickerInputEvent<Date>) {
    this.changedDate.emit(date.value!)
  }

  getTotalGainsNExpenses() {
    this.rest.getTotalGains(this.storage.get("businessCnpj"), this.selectedDate).subscribe((result) => {
      if (result.data != null)
        this.gains = result.data;
      else
        this.gains = 0
    })
    this.rest.getTotalExpenses(this.storage.get("businessCnpj"), this.selectedDate).subscribe((result) => {
      if (result.data != null)
        this.expenses = result.data;
      else
        this.expenses = 0
    })
  }
}
