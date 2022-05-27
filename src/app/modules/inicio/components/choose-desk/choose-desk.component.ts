import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { BusinessStorage } from 'src/app/core/utils/business-storage';
import { BUSINESS_CNPJ, OPEN_DESK_KEY } from 'src/app/core/utils/constants';
import { Order } from 'src/app/modules/dashboard/models/order.model';
import { SharedDialogComponent } from 'src/app/modules/shared/components/shared-dialog/shared-dialog.component';
import { InicioService } from '../../services/inicio.service';

interface Desks {
  name: string;
}

@Component({
  selector: 'rp-choose-desk',
  templateUrl: './choose-desk.component.html',
  styleUrls: ['./choose-desk.component.less']
})
export class ChooseDeskComponent implements OnInit {
  @Input() index: number = 0;
  @Output() indexChanged = new EventEmitter<number>();
  desksControl = new FormControl('', [Validators.required]);
  selectedDesk = "";
  @Output() deskChoosed = new EventEmitter<string>();
  @Output() orderCreated = new EventEmitter<Order>();

  desks: Desks[] = [
    { name: 'Delivery' },
    { name: 'Balcão' },
    { name: 'Mesa - 1' },
    { name: 'Mesa - 2' },
    { name: 'Mesa - 3' },
    { name: 'Mesa - 4' },
    { name: 'Mesa - 5' },
    { name: 'Mesa - 6' },
    { name: 'Mesa - 7' },
    { name: 'Mesa - 8' },
    { name: 'Mesa - 9' },
  ];

  constructor(private storage: BusinessStorage, private dialog: MatDialog, private service: InicioService) { }

  ngOnInit(): void {
    this.service.getOccupiedDesks(this.storage.get(BUSINESS_CNPJ)).subscribe(r => {
      if (r) {
        r.data.map(desk => {
          const index = this.desks.findIndex(v => desk.deskDescription === v.name)
          if (index > -1)
            this.desks.splice(index, 1)
        })
      }
    })
  }

  initializeOrder() {
    if (!this.desksControl.valid) {
      alert("Selecione uma mesa para prosseguir")
      return
    }

    const dialogRef = this.dialog.open(SharedDialogComponent, {
      data: { name: this.selectedDesk, type: OPEN_DESK_KEY }
    });


    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.service.postOrder({
          orderId: undefined,
          employeeCpf: undefined,
          deskDescription: this.selectedDesk,
          concluded: false,
          businessCnpj: this.storage.get(BUSINESS_CNPJ),
          dateTimeOrder: new Date()
        }).subscribe(result => {
          if (result) {
            this.orderCreated.emit(result.data)
            this.index += 1;
            this.indexChanged.emit(this.index)
          }
        })
      }
      else
        this.cancelAttendance()
    })
  }

  cancelAttendance() {
    this.index -= 1;
    this.indexChanged.emit(this.index)
  }

}
