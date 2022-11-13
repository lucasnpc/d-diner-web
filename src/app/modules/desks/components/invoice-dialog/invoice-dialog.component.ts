import { CurrencyPipe } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { datePipe, SAVE_DATE_FORMAT, SHOW_INVOICE_DATE_FORMAT } from 'src/app/core/utils/constants';
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
  currencyPipe = new CurrencyPipe('pt-Br')

  constructor(@Inject(MAT_DIALOG_DATA) public data: { items: MenuItem[], orderId: string },
    public dialogRef: MatDialogRef<InvoiceDialogComponent>, private service: CaixaService) { }

  ngOnInit(): void {
    this.data.items.map(i => {
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

    this.service.postGain(gain).then(() => {
      this.createInvoice()
      this.dialogRef.close(true)
    }).catch(e => alert(e))
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

  createInvoice() {
    const doc = new jsPDF();
    const date = new Date()
    var itemShow: { name: string; quantity: number; total: string; }[] = []

    this.data.items.forEach(item => itemShow.push({
      name: item.description,
      quantity: item.itemQuantity,
      total: `${this.currencyPipe.transform(item.price * item.itemQuantity, 'BRL')}`
    }))

    const sum = this.data.items.reduce((acc, obj) => {
      return acc + (obj.price * obj.itemQuantity)
    }, 0)

    doc.text(`Pedido concluído ${datePipe.transform(date, SHOW_INVOICE_DATE_FORMAT)}`, 14, 12)

    autoTable(doc, {
      columns: [
        { header: 'Item', dataKey: 'name' },
        { header: 'Quantidade', dataKey: 'quantity' },
        { header: 'Total', dataKey: 'total' },
      ],
      body: itemShow,
    });

    let finalY = (doc as any).lastAutoTable.finalY;

    if (this.payementForm == 'Dinheiro') {
      doc.text(`Forma de pagamento ${this.payementForm}`, 14, finalY + 10)
      doc.text(`Troco: ${this.currencyPipe.transform(this.cashChange - this.totalValue, 'BRL')}`, 150, finalY + 10)
    }
    else
      doc.text(`Forma de pagamento ${this.payementForm}`, 14, finalY + 10)

    autoTable(doc, {
      startY: finalY + 15,
      columns: [
        { header: '=Total do pedido' },
        { header: `${this.currencyPipe.transform(sum, 'BRL')}` }
      ]
    })

    doc.save(`Pedido ${this.data.orderId}.pdf`);
    doc.close;
  }
}
