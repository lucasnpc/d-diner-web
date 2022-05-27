import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FornecedoresPage } from './pages/fornecedores/fornecedores.page';
import { ProvidersService } from './services/fornecedores.service';
import { FornecedoresRoutingModule } from './fornecedores-routing';
import { SharedModule } from '../shared/shared.module';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { HttpClientModule } from '@angular/common/http';
import { AddProviderDialogComponent } from './components/add-provider-dialog/add-provider-dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@NgModule({
  declarations: [
    FornecedoresPage,
    AddProviderDialogComponent
  ],
  imports: [
    CommonModule,
    FornecedoresRoutingModule,
    SharedModule,
    MatGridListModule,
    MatButtonModule,
    MatDialogModule,
    MatTableModule,
    MatCardModule,
    HttpClientModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule
  ],
  providers: [ProvidersService]
})

export class FornecedoresModule { }
