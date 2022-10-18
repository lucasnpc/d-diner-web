import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FuncionariosPage } from './pages/funcionarios/funcionarios.page';
import { FuncionariosRoutingModule } from './funcionarios-routing.module';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { SharedModule } from '../shared/shared.module';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogAddInFuncionariosComponent } from './components/dialog-add-in-funcionarios/dialog-add-in-funcionarios.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { HttpClientModule } from '@angular/common/http';
import { FuncionarioService } from './service/funcionario.service';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  declarations: [
    FuncionariosPage,
    DialogAddInFuncionariosComponent,
  ],
  imports: [
    CommonModule,
    FuncionariosRoutingModule,
    MatGridListModule,
    MatTableModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    SharedModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    HttpClientModule,
    CurrencyMaskModule,
    MatSelectModule
  ],
  providers: [FuncionarioService],
})
export class FuncionariosModule { }
