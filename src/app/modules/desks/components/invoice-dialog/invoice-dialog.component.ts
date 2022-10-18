import { Component, Inject, OnInit } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { datePipe, SAVE_DATE_FORMAT } from 'src/app/core/utils/constants';
import { Gain } from 'src/app/modules/caixa/models/gain.model';
import { CaixaService } from 'src/app/modules/caixa/service/caixa.service';
import { MenuItem } from 'src/app/modules/cardapio/models/menu-item.model';

@Component({
  selector: 'rp-invoice-dialog',
  templateUrl: './invoice-dialog.component.html',
  styleUrls: ['./invoice-dialog.component.less']
})
export class InvoiceDialogComponent implements OnInit {

  payementForm: string = '';
  payements: string[] = ['Crédito', 'Débito', 'Dinheiro', 'Pix'];
  totalValue = 0
  additionalValue = 0
  clientOptToNotPay = false
  cashChange = 0
  cashChangeFormControl = new UntypedFormControl('');

  constructor(@Inject(MAT_DIALOG_DATA) public data: MenuItem[],
    public dialogRef: MatDialogRef<InvoiceDialogComponent>, private service: CaixaService) { }

  ngOnInit(): void {
    this.data.map(i => {
      this.totalValue += Number(i.price * i.itemQuantity!)
    })
    this.additionalValue = Number(this.totalValue * 0.1)
    this.totalValue += Number(this.additionalValue)
  }
  addGain() {
    if (this.payementForm == null) return;
    if (this.payementForm == 'Dinheiro' && this.cashChange - this.totalValue < 0) {
      alert('Valor de troco inválido')
      return;
    }

    const gain: Gain = {
      id: '',
      value: this.totalValue,
      paymentWay: this.payementForm,
      gainDate: datePipe.transform(new Date(), SAVE_DATE_FORMAT)!,
      additionalValue: this.additionalValue
    }

    this.service.postGain(gain).then(() => this.dialogRef.close(true)).catch(e => alert(e))
  }

  changeCheck() {
    this.clientOptToNotPay = !this.clientOptToNotPay
    if (this.clientOptToNotPay) {
      this.totalValue -= Number(this.additionalValue)
      this.additionalValue = 0
    }
    else {
      this.additionalValue = Number(this.totalValue * 0.1)
      this.totalValue += Number(this.additionalValue)
    }
  }
}
