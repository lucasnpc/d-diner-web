import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientesPage } from './pages/clientes/clientes.page';
import { ClientesRoutingModule } from './clientes-routing.module';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { SharedModule } from '../shared/shared.module';
import { DialogAddInClientesComponent } from './components/dialog-add-in-clientes/dialog-add-in-clientes.component';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ClienteService } from './service/cliente.service';

@NgModule({
  declarations: [
    ClientesPage,
    DialogAddInClientesComponent,
  ],
  imports: [
    CommonModule,
    ClientesRoutingModule,
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
    HttpClientModule,
  ],
  providers: [ClienteService],
})
export class ClientesModule {}
