import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatStepperModule } from '@angular/material/stepper';
import { CadastroPage } from './pages/cadastro-page/cadastro.page';
import { CadastroRoutingModule } from './cadastro-routing.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { HttpClientModule } from '@angular/common/http';
import { MatGridListModule } from '@angular/material/grid-list';

import { CadastroService } from './service/cadastro.service';

@NgModule({
  declarations: [CadastroPage],
  imports: [
    CommonModule,
    CadastroRoutingModule,
    MatStepperModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    HttpClientModule,
    MatGridListModule,
  ],
  providers: [CadastroService],
})
export class CardapioModule {}
