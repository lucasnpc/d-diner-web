import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MenuItemInfo } from '../../models/MenuItemInfo.model';

@Component({
  selector: 'rp-kitchen-order-dialog',
  templateUrl: './kitchen-order-dialog.component.html',
  styleUrls: ['./kitchen-order-dialog.component.less']
})
export class KitchenOrderDialogComponent implements OnInit {

  items: MenuItemInfo[] = []

  constructor(@Inject(MAT_DIALOG_DATA) public data: MenuItemInfo[]) { }

  ngOnInit(): void {
    this.items = this.data
  }

}
