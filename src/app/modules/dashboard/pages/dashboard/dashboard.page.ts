import { Component, OnInit } from '@angular/core';
import { USER_INFO } from 'src/app/core/utils/constants';

@Component({
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.less']
})
export class DashboardPage implements OnInit {

  selectedDate: Date = new Date()

  constructor() { }

  ngOnInit(): void {
    console.log(localStorage.getItem(USER_INFO));
  }

  changeDate(changedDate: Date) {
    if (changedDate != this.selectedDate)
      this.selectedDate = changedDate
  }

}
