import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule, registerLocaleData } from '@angular/common';
import { DashboardPage } from './pages/dashboard/dashboard.page';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { SharedModule } from '../shared/shared.module';
import { MatGridListModule } from '@angular/material/grid-list';
import { TotalOrdersComponent } from './components/total-orders/total-orders.component';
import { ActiveOrdersComponent } from './components/active-orders/active-orders.component';
import { ConcludedOrdersComponent } from './components/concluded-orders/concluded-orders.component';
import { GainsComponent } from './components/gains/gains.component';
import { InformativeGraphComponent } from './components/informative-graph/informative-graph.component';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { DashboardDetailPage } from './pages/dashboard-detail/dashboard-detail.page';
import { DashboardService } from './service/dashboard.service';
import LocalePT from '@angular/common/locales/pt';
import { MatListModule } from '@angular/material/list';
import { MatDialogModule } from '@angular/material/dialog';
import { InvoiceDialogComponent } from './components/invoice-dialog/invoice-dialog.component';
import { CaixaService } from '../caixa/service/caixa.service';
import { MatRadioModule } from '@angular/material/radio';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InicioService } from '../inicio/services/inicio.service';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, NativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
registerLocaleData(LocalePT);

@NgModule({
  declarations: [
    DashboardPage,
    TotalOrdersComponent,
    ActiveOrdersComponent,
    ConcludedOrdersComponent,
    GainsComponent,
    InformativeGraphComponent,
    DashboardDetailPage,
    InvoiceDialogComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    DashboardRoutingModule,
    SharedModule,
    MatGridListModule,
    MatButtonModule,
    NgxChartsModule,
    MatMenuModule,
    MatIconModule,
    MatListModule,
    MatDialogModule,
    MatRadioModule,
    FormsModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatSnackBarModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    MatFormFieldModule
  ],
  providers: [DashboardService, CaixaService, InicioService],
})
export class DashboardModule { }
