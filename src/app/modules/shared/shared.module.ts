import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutMenuComponent } from './components/layout-menu/layout-menu.component';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { TopBarComponent } from './components/top-bar/top-bar.component';
import { SharedDialogComponent } from './components/shared-dialog/shared-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { LoginService } from '../login/services/login.service';

@NgModule({
  declarations: [LayoutMenuComponent, TopBarComponent, SharedDialogComponent],
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatDialogModule,
  ],
  exports: [LayoutMenuComponent, TopBarComponent],
  providers: [LoginService]
})
export class SharedModule { }
