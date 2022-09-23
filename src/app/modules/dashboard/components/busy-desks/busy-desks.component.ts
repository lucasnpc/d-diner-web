import { Component, Input, OnInit } from '@angular/core';
import { Desk } from '../../models/desk.model';
import { DashboardService } from '../../service/dashboard.service';

@Component({
  selector: 'rp-active-orders',
  templateUrl: './busy-desks.component.html',
  styleUrls: ['./busy-desks.component.less']
})
export class BusyDesksComponent implements OnInit {
  busyDesks: Desk[] = []
  @Input() selectedDate: Date = new Date()

  constructor(private rest: DashboardService) { }

  ngOnInit(): void {
    this.getBusyDesks()
  }

  getBusyDesks() {
    this.rest.getBusyDesks().then(result =>
      this.busyDesks = result
    )
  }

  showDesks() {

  }

}
