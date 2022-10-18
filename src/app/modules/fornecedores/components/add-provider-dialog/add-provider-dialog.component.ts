import { Component, Inject, OnInit } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Provider } from '../../models/provider.model';
import { ProvidersService } from '../../services/fornecedores.service';

@Component({
  selector: 'rp-add-provider-dialog',
  templateUrl: './add-provider-dialog.component.html',
  styleUrls: ['./add-provider-dialog.component.less']
})
export class AddProviderDialogComponent implements OnInit {
  formRegisterProviders = this.fb.group({
    providerCnpj: ['', Validators.required],
    corporateName: ['', Validators.required],
    street: ['', Validators.required],
    number: ['', Validators.required],
    district: ['', Validators.required],
    city: ['', Validators.required],
    state: ['', Validators.required],
    phone: ['', Validators.required],
    email: ['', Validators.required],
  });
  isEditting = false;

  constructor(private fb: UntypedFormBuilder, private service: ProvidersService,
    public dialogRef: MatDialogRef<AddProviderDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Provider
  ) { }

  ngOnInit(): void {
    if (this.data.idCnpj != undefined) this.isEditting = true
  }

  sendProvider(edit: boolean) {
    var data: Provider = {
      idCnpj: this.formRegisterProviders.get('providerCnpj')!.value,
      corporateName: this.formRegisterProviders.get('corporateName')!.value,
      street: this.formRegisterProviders.get('street')!.value,
      number: this.formRegisterProviders.get('number')!.value,
      district: this.formRegisterProviders.get('district')!.value,
      city: this.formRegisterProviders.get('city')!.value,
      state: this.formRegisterProviders.get('state')!.value,
      phone: this.formRegisterProviders.get('phone')!.value,
      email: this.formRegisterProviders.get('email')!.value,
      decommissioned: false
    }

    edit ? this.updateProvider(data) : this.addProvider(data)

  }

  addProvider(provider: Provider) {
    this.service.postProvider(provider).then(() => {
      this.dialogRef.close(true)
    }).catch(e => console.log(e))
  }

  updateProvider(provider: Provider) {
    this.service.updateProvider(provider).then(() => {
      this.dialogRef.close(true)
    }).catch(e => console.log(e)
    )
  }
}
