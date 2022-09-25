import { Component, OnInit } from '@angular/core';

@Component({
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.less']
})
export class DashboardPage implements OnInit {

  selectedDate: Date = new Date()

  constructor() { }

  ngOnInit(): void {
    
  }

  changeDate(changedDate: Date) {
    if (changedDate != this.selectedDate)
      this.selectedDate = changedDate
  }

}
