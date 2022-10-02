import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatListModule } from '@angular/material/list';
import { KitchenService } from './services/kitchen.service';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { KitchenPage } from './pages/kitchen/kitchen.page';
import { KitchenRoutingModule } from './kitchen-routing.module';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MenuService } from '../cardapio/service/menu.service';

@NgModule({
    declarations: [
        KitchenPage,
    ],
    imports: [
        CommonModule,
        KitchenRoutingModule,
        SharedModule,
        MatGridListModule,
        MatButtonModule,
        MatDialogModule,
        MatIconModule,
        MatTabsModule,
        MatSelectModule,
        MatInputModule,
        FormsModule,
        ReactiveFormsModule,
        MatAutocompleteModule,
        MatListModule,
        MatDialogModule,
        MatSnackBarModule,
        MatProgressSpinnerModule
    ],
    providers: [KitchenService, MenuService]
})

export class KitchenModule { }
