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

@NgModule({
    declarations: [DesksPageComponent, DeskDataDialogComponent],
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
        MatIconModule
    ],
    providers: [DesksService]
})

export class DesksModule { }