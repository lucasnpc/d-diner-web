import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatDialogModule } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatGridListModule } from "@angular/material/grid-list";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { SharedModule } from "../shared/shared.module";
import { DesksPageComponent } from "./pages/desks-page/desks-page.component";
import { DesksRoutingModule } from "./desks-routing.module";
import { DesksService } from "./service/desk-service.service";
import { DeskDataDialogComponent } from './components/desk-data-dialog/desk-data-dialog.component';
import { InvoiceDialogComponent } from "./components/invoice-dialog/invoice-dialog.component";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatRadioModule } from "@angular/material/radio";
import { CaixaService } from "../caixa/service/caixa.service";
import { MenuService } from "../cardapio/service/menu.service";
import { CurrencyMaskModule } from "ng2-currency-mask";

@NgModule({
    declarations: [DesksPageComponent, DeskDataDialogComponent, InvoiceDialogComponent],
    imports: [
        CommonModule,
        DesksRoutingModule,
        SharedModule,
        MatGridListModule,
        MatButtonModule,
        MatIconModule,
        MatDialogModule,
        MatInputModule,
        MatFormFieldModule,
        FormsModule,
        ReactiveFormsModule,
        MatIconModule,
        MatCheckboxModule,
        MatRadioModule,
        CurrencyMaskModule
    ],
    providers: [DesksService, CaixaService, MenuService]
})

export class DesksModule { }