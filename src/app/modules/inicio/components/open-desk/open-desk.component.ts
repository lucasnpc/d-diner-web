import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'rp-open-desk',
  templateUrl: './open-desk.component.html',
  styleUrls: ['./open-desk.component.less']
})
export class OpenDeskComponent implements OnInit {
  @Input() index: number = 0;
  @Output() indexChanged = new EventEmitter<number>();

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  openDesk() {
    this.index += 1
    this.indexChanged.emit(this.index);
  }
  openActiveOrders() {
    this.router.navigate(['/menu/dashboard/detail'])
  }
}
