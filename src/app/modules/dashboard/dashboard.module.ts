import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardPage } from './pages/dashboard/dashboard.page';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { SharedModule } from '../shared/shared.module';
import { MatGridListModule } from '@angular/material/grid-list';
import { OrderInKitchenComponent } from './components/orders-in-kitchen/orders-in-kitchen.component';
import { BusyDesksComponent } from './components/busy-desks/busy-desks.component';
import { ConcludedOrdersComponent } from './components/concluded-orders/concluded-orders.component';
import { GainsComponent } from './components/gains/gains.component';
import { InformativeGraphComponent } from './components/informative-graph/informative-graph.component';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { DashboardDetailPage } from './pages/dashboard-detail/dashboard-detail.page';
import { DashboardService } from './service/dashboard.service';
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
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { KitchenService } from '../kitchen/services/kitchen.service';

@NgModule({
  declarations: [
    DashboardPage,
    OrderInKitchenComponent,
    BusyDesksComponent,
    ConcludedOrdersComponent,
    GainsComponent,
    InformativeGraphComponent,
    DashboardDetailPage,
    InvoiceDialogComponent,
  ],
  imports: [
    CommonModule,
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
  providers: [DashboardService, CaixaService, InicioService, KitchenService],
})
export class DashboardModule { }
