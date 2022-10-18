import { Component, Inject, OnInit } from '@angular/core';
import { Validators, UntypedFormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Client } from '../../models/client.model';
import { ClienteService } from '../../service/cliente.service';

@Component({
  selector: 'rp-dialog-add-in-clientes',
  templateUrl: './dialog-add-in-clientes.component.html',
  styleUrls: ['./dialog-add-in-clientes.component.less']
})
export class DialogAddInClientesComponent implements OnInit {
  formRegisterClients = this.fb.group({
    phone: ['', Validators.required],
    name: ['', Validators.required],
    number: ['', Validators.required],
    street: ['', Validators.required],
    district: ['', Validators.required],
    city: ['', Validators.required],
  });
  isEditting = false;

  constructor(
    private fb: UntypedFormBuilder,
    private rest: ClienteService,
    public dialogRef: MatDialogRef<DialogAddInClientesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Client
  ) {
  }

  ngOnInit(): void {
    if (this.data.phone != undefined) this.isEditting = true
  }

  sendClient(edit: boolean) {
    var data: Client = {
      id: this.data.id,
      name: this.formRegisterClients.get('name')!.value,
      street: this.formRegisterClients.get('street')!.value,
      number: this.formRegisterClients.get('number')!.value,
      district: this.formRegisterClients.get('district')!.value,
      city: this.formRegisterClients.get('city')!.value,
      phone: this.formRegisterClients.get('phone')!.value,
    };

    edit ? this.updateClient(data) : this.addClient(data)
  }

  addClient(client: Client) {
    this.rest.postCustomer(client).then(() => {
      this.dialogRef.close(true);
    }).catch(e => console.log(e));
  }

  updateClient(client: Client) {
    this.rest.updateCustomer(client).then(() => {
      this.dialogRef.close(true);
    }).catch(e => console.log(e))
  }
}
