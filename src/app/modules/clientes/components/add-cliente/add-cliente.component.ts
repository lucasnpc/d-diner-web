import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BusinessStorage } from 'src/app/core/utils/business-storage';
import { BUSINESS_CNPJ } from 'src/app/core/utils/constants';
import { Client } from '../../models/client.model';
import { ClienteService } from '../../service/cliente.service';
import { DialogAddInClientesComponent } from '../dialog-add-in-clientes/dialog-add-in-clientes.component';

@Component({
  selector: 'rp-add-cliente',
  templateUrl: './add-cliente.component.html',
  styleUrls: ['./add-cliente.component.less'],
})
export class AddClienteComponent implements OnInit {
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
    private fb: FormBuilder,
    private rest: ClienteService,
    public dialogRef: MatDialogRef<DialogAddInClientesComponent>,
    private storage: BusinessStorage,
    @Inject(MAT_DIALOG_DATA) public data: Client
  ) {
  }

  ngOnInit(): void {
    if (this.data.phone != undefined) this.isEditting = true
  }

  sendClient(edit: boolean) {
    var data: Client = {
      clientId: this.data.clientId,
      name: this.formRegisterClients.get('name').value,
      street: this.formRegisterClients.get('street').value,
      number: this.formRegisterClients.get('number').value,
      district: this.formRegisterClients.get('district').value,
      city: this.formRegisterClients.get('city').value,
      phone: this.formRegisterClients.get('phone').value,
      businessCnpj: this.storage.get(BUSINESS_CNPJ)
    };

    edit ? this.updateClient(data) : this.addClient(data)
  }

  addClient(client: Client) {
    this.rest.postCustomer(client).subscribe((result) => {
      if (result.success) this.dialogRef.close(true);
    });
  }

  updateClient(client: Client) {
    this.rest.updateCustomer(client).subscribe((result) => {
      if (result.success) this.dialogRef.close(true);
    });
  }
}
