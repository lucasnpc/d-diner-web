import { Component, Inject, OnInit } from '@angular/core';
import { Validators, UntypedFormBuilder } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Employee } from '../../models/employee.model';
import { FuncionarioService } from '../../service/funcionario.service';

@Component({
  selector: 'rp-dialog-add-in-funcionarios',
  templateUrl: './dialog-add-in-funcionarios.component.html',
  styleUrls: ['./dialog-add-in-funcionarios.component.less']
})

export class DialogAddInFuncionariosComponent implements OnInit {
  formRegisterEmployees = this.fb.group({
    cpf: ['', Validators.required],
    name: ['', Validators.required],
    street: ['', Validators.required],
    number: ['', Validators.required],
    district: ['', Validators.required],
    city: ['', Validators.required],
    phone: ['', Validators.required],
    admissionDate: ['', Validators.required],
    birthDate: ['', Validators.required],
    salary: ['', Validators.required],
    isOutsource: ['', Validators.required]
  });
  isEditting = false;

  constructor(
    private fb: UntypedFormBuilder,
    dateAdapter: DateAdapter<any>,
    private rest: FuncionarioService,
    private dialogRef: MatDialogRef<DialogAddInFuncionariosComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Employee
  ) {
    dateAdapter.setLocale('pt-br');
  }

  ngOnInit(): void {
    if (this.data.idCpf != undefined) {
      this.data.isOutsource ? this.formRegisterEmployees.controls['isOutsource'].setValue('option1')
        : this.formRegisterEmployees.controls['isOutsource'].setValue('option2')
      this.isEditting = true
    }
  }

  sendEmployee(edit: boolean) {
    var employee: Employee = {
      idCpf: String(this.formRegisterEmployees.get('cpf')!.value),
      name: this.formRegisterEmployees.get('name')!.value,
      street: this.formRegisterEmployees.get('street')!.value,
      number: String(this.formRegisterEmployees.get('number')!.value),
      district: this.formRegisterEmployees.get('district')!.value,
      city: this.formRegisterEmployees.get('city')!.value,
      phone: this.formRegisterEmployees.get('phone')!.value,
      admissionDate: this.formRegisterEmployees.get('admissionDate')!.value,
      birthDate: this.formRegisterEmployees.get('birthDate')!.value,
      terminationDate: undefined,
      salary: this.formRegisterEmployees.get('salary')!.value,
      isOutsource: this.formRegisterEmployees.get('isOutsource')!.value == "Sim",
      isActive: true,
    };

    edit ? this.updateEmployee(employee) : this.addEmployee(employee)
  }

  addEmployee(employee: Employee) {
    this.rest.postEmployee(employee).then(() => this.dialogRef.close(true)).catch(e => alert(e))
  }

  updateEmployee(employee: Employee) {
    this.rest.updateEmployee(employee).then(() => this.dialogRef.close(true)).catch(e => alert(e))
  }
}
