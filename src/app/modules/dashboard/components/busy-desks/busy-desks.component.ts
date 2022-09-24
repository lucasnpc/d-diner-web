import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DESKS_ROUTE } from 'src/app/core/utils/constants';
import { Desk } from 'src/app/modules/desks/model/desk.model';
import { DashboardService } from '../../service/dashboard.service';

@Component({
  selector: 'rp-active-orders',
  templateUrl: './busy-desks.component.html',
  styleUrls: ['./busy-desks.component.less']
})
export class BusyDesksComponent implements OnInit {
  busyDesks: Desk[] = []
  @Input() selectedDate: Date = new Date()

  constructor(private rest: DashboardService, private router: Router) { }

  ngOnInit(): void {
    this.getBusyDesks()
  }

  ngOnChanges() {
    this.getBusyDesks()
  }

  getBusyDesks() {
    this.rest.getBusyDesks().then(result =>
      this.busyDesks = result
    )
  }

  showDesks() {
    this.router.navigate([DESKS_ROUTE])
  }

}
