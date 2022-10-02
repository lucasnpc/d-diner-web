import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CaixaRoutingModule } from './caixa-routing.module';
import { CaixaPage } from './pages/caixa/caixa.page';
import { MatGridListModule } from '@angular/material/grid-list';
import { ListSaidasComponent } from './components/list-saidas/list-saidas.component';
import { ListEntradasComponent } from './components/list-entradas/list-entradas.component';
import { CaixaBalanceComponent } from './components/caixa-balance/caixa-balance.component';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { SharedModule } from '../shared/shared.module';
import { DialogAddInCaixaComponent } from './components/dialog-add-in-caixa/dialog-add-in-caixa.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MenuService } from '../cardapio/service/menu.service';
import { HttpClientModule } from '@angular/common/http';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatTabsModule } from '@angular/material/tabs';
import { AddInflowComponent } from './components/add-inflow/add-inflow.component';
import { AddExpenseComponent } from './components/add-expense/add-expense.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { CaixaService } from './service/caixa.service';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

@NgModule({
  declarations: [
    CaixaPage,
    ListSaidasComponent,
    ListEntradasComponent,
    CaixaBalanceComponent,
    DialogAddInCaixaComponent,
    AddInflowComponent,
    AddExpenseComponent,
  ],
  imports: [
    CommonModule,
    CaixaRoutingModule,
    MatGridListModule,
    MatCardModule,
    MatTableModule,
    MatButtonModule,
    MatExpansionModule,
    MatIconModule,
    SharedModule,
    MatDialogModule,
    MatInputModule,
    MatListModule,
    HttpClientModule,
    MatSelectModule,
    MatRadioModule,
    MatTabsModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    CurrencyMaskModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  providers: [MenuService, CaixaService],
})
export class CaixaModule { }
