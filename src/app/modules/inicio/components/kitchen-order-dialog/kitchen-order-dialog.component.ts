import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MenuItem } from 'src/app/modules/cardapio/models/menu-item.model';

@Component({
  selector: 'rp-kitchen-order-dialog',
  templateUrl: './kitchen-order-dialog.component.html',
  styleUrls: ['./kitchen-order-dialog.component.less']
})
export class KitchenOrderDialogComponent implements OnInit {

  items: MenuItem[] = []

  constructor(@Inject(MAT_DIALOG_DATA) public data: MenuItem[]) { }

  ngOnInit(): void {
    this.items = this.data
  }

}
