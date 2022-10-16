import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { BusinessStorage } from 'src/app/core/utils/business-storage';
import { datePipe, SHOW_DATE_FORMAT } from 'src/app/core/utils/constants';
import { SharedDialogComponent } from 'src/app/modules/shared/components/shared-dialog/shared-dialog.component';
import { DialogAddInFuncionariosComponent } from '../../components/dialog-add-in-funcionarios/dialog-add-in-funcionarios.component';
import { Employee } from '../../models/employee.model';
import { FuncionarioService } from '../../service/funcionario.service';

@Component({
  templateUrl: './funcionarios.page.html',
  styleUrls: ['./funcionarios.page.less'],
})

export class FuncionariosPage implements OnInit {
  filterEvent: Event | undefined;
  filterValue: String = '';
  dataSource: any;
  clickedRow: Employee | undefined;

  displayedColumns: string[] = [
    'CPF',
    'Nome',
    'Rua',
    'Número',
    'Bairro',
    'Cidade',
    'Telefone',
    'Data de Admissao',
    'Data de Nascimento',
  ];

  constructor(private dialog: MatDialog, private rest: FuncionarioService, private storage: BusinessStorage) { }

  ngOnInit(): void {
    this.getEmployees()
  }

  ngOnChanges() {
    if (this.filterEvent != null) this.applyFilter(this.filterEvent);
  }

  getEmployees() {
    this.rest.getEmployees().subscribe((result) => this.dataSource = new MatTableDataSource(result));
  }

  openDialog(edit: boolean) {
    var dialogRef
    if (edit === true) {
      if (this.clickedRow === undefined) { alert('Selecione um registro para editar!!'); return }
      dialogRef = this.dialog.open(DialogAddInFuncionariosComponent, {
        data: ({
          idCpf: this.clickedRow.idCpf,
          name: this.clickedRow.name,
          street: this.clickedRow.street,
          number: this.clickedRow.number,
          district: this.clickedRow.district,
          city: this.clickedRow.city,
          phone: this.clickedRow.phone,
          admissionDate: this.formatToDate(this.clickedRow.admissionDate),
          birthDate: this.formatToDate(this.clickedRow.birthDate),
          salary: this.clickedRow.salary,
          isOutsource: this.clickedRow.isOutsource,
          isActive: this.clickedRow.isActive,
        })
      })
    }
    else
      dialogRef = this.dialog.open(DialogAddInFuncionariosComponent, {
        data: {}
      });

    dialogRef.afterClosed()
  }

  applyFilter(event: Event) {
    this.filterValue = (event.target as HTMLInputElement).value.toString();
    this.dataSource.filter = this.filterValue.trim().toLowerCase();
  }

  setRow(row: Employee) {
    this.clickedRow = row;
  }

  openExcludingDialog() {
    if (this.clickedRow === undefined) { alert('Selecione um registro para editar!!'); return }

    const dialogRef = this.dialog.open(SharedDialogComponent)

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.rest.unactivateEmployee(this.clickedRow!.idCpf)
      }
    })
  }

  formatDateString(dateString: string) {
    const [day, month, year] = dateString.split('/');
    return datePipe.transform(new Date(+year, +month - 1, +day), SHOW_DATE_FORMAT)
  }

  formatToDate(dateString: string) {
    const [day, month, year] = dateString.split('/');
    return new Date(+year, +month - 1, +day);
  }
}
