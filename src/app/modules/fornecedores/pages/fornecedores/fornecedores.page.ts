import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { BusinessStorage } from 'src/app/core/utils/business-storage';
import { PROVIDER_KEY } from 'src/app/core/utils/constants';
import { SharedDialogComponent } from 'src/app/modules/shared/components/shared-dialog/shared-dialog.component';
import { AddProviderDialogComponent } from '../../components/add-provider-dialog/add-provider-dialog.component';
import { Provider } from '../../models/provider.model';
import { ProvidersService } from '../../services/fornecedores.service';

@Component({
  templateUrl: './fornecedores.page.html',
  styleUrls: ['./fornecedores.page.less']
})
export class FornecedoresPage implements OnInit {
  filterEvent: Event;
  filterValue: String;
  providers: Provider[];
  clickedRow: Provider;
  dataSource: any;

  displayedColumns: string[] = [
    'providerCnpj',
    'corporateName',
    'street',
    'number',
    'district',
    'city',
    'state',
    'phone',
    'email'
  ]

  constructor(private dialog: MatDialog, private service: ProvidersService, private storage: BusinessStorage) { }

  ngOnInit(): void {
    this.getProviders()
  }

  ngOnChanges() {
    if (this.filterEvent != null) this.applyFilter(this.filterEvent);
  }

  getProviders() {
    this.service.getProviders(this.storage.get("businessCnpj")).subscribe((result) => {
      this.providers = result.data;
      this.dataSource = new MatTableDataSource(this.providers);
    });
  }

  openDialog(edit: boolean) {
    var dialogRef
    if (edit === true) {
      if (this.clickedRow === undefined) { alert('Selecione um registro para editar!!'); return }
      dialogRef = this.dialog.open(AddProviderDialogComponent, {
        data: this.clickedRow
      })
    }
    else
      dialogRef = this.dialog.open(AddProviderDialogComponent, {
        data: {}
      });

    dialogRef.afterClosed().subscribe(result => {
      if (result)
        this.getProviders()
    })
  }

  applyFilter(event: Event) {
    this.filterValue = (event.target as HTMLInputElement).value.toString();
    this.dataSource.filter = this.filterValue.trim().toLowerCase();
  }

  setRow(row: Provider) {
    this.clickedRow = row;
  }

  openExcludingDialog() {
    if (this.clickedRow === undefined) { alert('Selecione um registro para editar!!'); return }

    const dialogRef = this.dialog.open(SharedDialogComponent, {
      data: {
        name: this.clickedRow.corporateName,
        type: PROVIDER_KEY
      }
    })

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.service.disableProvider(this.clickedRow.providerCnpj).subscribe(r => {
          if (r.success)
            this.getProviders()
        })
      }
    })
  }
}
