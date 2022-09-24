import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { DeskDataDialogComponent } from '../../components/desk-data-dialog/desk-data-dialog.component';
import { Desk } from '../../model/desk.model';
import { DesksService } from '../../service/desk-service.service';

const RESTAURANT_ICON_WHITE = `
<svg xmlns="http://www.w3.org/2000/svg" height="48px" viewBox="0 0 24 24" width="48px" 
fill="#FFFFFF"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M16 6v8h3v8h2V2c-2.76 0-5 2.24-5 4zm-5 3H9V2H7v7H5V2H3v7c0 
2.21 1.79 4 4 4v9h2v-9c2.21 0 4-1.79 4-4V2h-2v7z"/></svg>`
const RESTAURANT_ICON_GRAY = `
<svg xmlns="http://www.w3.org/2000/svg" height="48px" viewBox="0 0 24 24" width="48px" 
fill="#848684"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M16 6v8h3v8h2V2c-2.76 0-5 2.24-5 4zm-5 3H9V2H7v7H5V2H3v7c0 
2.21 1.79 4 4 4v9h2v-9c2.21 0 4-1.79 4-4V2h-2v7z"/></svg>`
const INFO_ICON = `
<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#FFFFFF">
<path d="M0 0h24v24H0V0z" fill="none"/><path d="M11 7h2v2h-2zm0 4h2v6h-2zm1-9C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 
2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/></svg>`

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
    this.service.getDesks().then(result => {
      this.desks = result.sort()
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
