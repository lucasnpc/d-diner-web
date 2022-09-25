import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Desk } from '../../model/desk.model';
import { DesksService } from '../../service/desk-service.service';

@Component({
  selector: 'app-desk-data-dialog',
  templateUrl: './desk-data-dialog.component.html',
  styleUrls: ['./desk-data-dialog.component.less']
})
export class DeskDataDialogComponent implements OnInit {

  desk: Desk = {
    id: '',
    description: '',
    isOccupied: false
  }
  startHour = ''

  constructor(@Inject(MAT_DIALOG_DATA) public data: Desk, private service: DesksService) { }

  ngOnInit(): void {
    this.desk = this.data
    this.getDeskInfo()
  }

  getDeskInfo() {
    this.service.getDeskInfo(this.desk.id).subscribe(result => {
      const info = result.docs[0].data()
      this.startHour = info['startHour']
    })
  }
}
