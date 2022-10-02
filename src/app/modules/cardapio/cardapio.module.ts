import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardapioPage } from './pages/cardapio/cardapio.page';
import { CardapioRoutingModule } from './cardapio-routing.module';
import { MatGridListModule } from '@angular/material/grid-list';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MenuService } from './service/menu.service';
import { HttpClientModule } from '@angular/common/http';
import { MatInputModule } from '@angular/material/input';
import { SharedModule } from '../shared/shared.module';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogAddInCardapioComponent } from './components/dialog-add-in-cardapio/dialog-add-in-cardapio.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatListModule } from '@angular/material/list';
import { ProductListitemComponent } from './components/product-listitem/product-listitem.component';

@NgModule({
  declarations: [
    CardapioPage,
    DialogAddInCardapioComponent,
    ProductListitemComponent,
  ],
  imports: [
    CommonModule,
    CardapioRoutingModule,
    MatGridListModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatInputModule,
    SharedModule,
    MatDialogModule,
    MatFormFieldModule,
    CurrencyMaskModule,
    MatTableModule,
    MatCardModule,
    MatAutocompleteModule,
    MatListModule,
    MatSelectModule
  ],
  providers: [MenuService],
})
export class CardapioModule { }
