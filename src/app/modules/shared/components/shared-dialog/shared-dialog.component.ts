import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ADD_ITEMS_TO_ORDER_KEY, CLIENT_KEY, DELETE_ORDER_KEY, EMPLOYEE_KEY, OPEN_DESK_KEY, PROVIDER_KEY } from 'src/app/core/utils/constants';

interface DialogData {
  name: string;
  type: string;
}

@Component({
  selector: 'rp-shared-dialog',
  templateUrl: './shared-dialog.component.html',
  styleUrls: ['./shared-dialog.component.less']
})
export class SharedDialogComponent implements OnInit {

  message = ''
  message2 = ''
  bCancel = 'Cancelar'
  bConfirm = 'Confirmar'

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  ngOnInit(): void {
    switch (this.data.type) {
      case EMPLOYEE_KEY:
        this.message = 'Funcionário'
        this.message2 = 'Será desligado(a)!'
        break;
      case PROVIDER_KEY:
        this.message = 'Fornecedor'
        this.message2 = 'Será descomissionado(a)!'
        break;
      case CLIENT_KEY:
        this.message = 'Cliente'
        this.message2 = 'Será excluído(a)!'
        break;
      case DELETE_ORDER_KEY:
        this.bCancel = 'Não'
        this.bConfirm = 'Sim'
        break;
      case ADD_ITEMS_TO_ORDER_KEY:
        this.message = 'Os Itens para'
        this.message2 = 'Serão Adicionados!'
        break;
      case OPEN_DESK_KEY:
        this.message = 'A mesa'
        this.message2 = 'Será aberta!'
        break
    }
  }

}
