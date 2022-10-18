import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { RESTAURANT_ICON_WHITE, RESTAURANT_ICON_GRAY, INFO_ICON } from 'src/app/core/utils/icons';
import { DeskDataDialogComponent } from '../../components/desk-data-dialog/desk-data-dialog.component';
import { Desk } from '../../model/desk.model';
import { DesksService } from '../../service/desk-service.service';

@Component({
  templateUrl: './desks-page.component.html',
  styleUrls: ['./desks-page.component.less']
})
export class DesksPageComponent implements OnInit {

  desks: Desk[] = []

  constructor(private service: DesksService, iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer, private dialog: MatDialog) {
    iconRegistry.addSvgIconLiteral(
      'restaurant-icon-white',
      sanitizer.bypassSecurityTrustHtml(RESTAURANT_ICON_WHITE)
    );
    iconRegistry.addSvgIconLiteral(
      'restaurant-icon-gray',
      sanitizer.bypassSecurityTrustHtml(RESTAURANT_ICON_GRAY)
    );
    iconRegistry.addSvgIconLiteral(
      'info-icon',
      sanitizer.bypassSecurityTrustHtml(INFO_ICON)
    );
  }

  ngOnInit(): void {
    this.getDesks()
  }

  getDesks() {
    this.service.getDesks().subscribe(result => {
      this.desks = result
    })
  }

  showDeskData(desk: Desk){
    if(desk.isOccupied){
      const dialogRef = this.dialog.open(DeskDataDialogComponent,{
        data: desk
      })

      dialogRef.afterClosed()
    }
  }
}
