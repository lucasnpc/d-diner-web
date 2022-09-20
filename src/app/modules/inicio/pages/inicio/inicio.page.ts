import { Component, OnInit, Sanitizer } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { BusinessStorage } from 'src/app/core/utils/business-storage';
import { USER_INFO } from 'src/app/core/utils/constants';
import { Order } from 'src/app/modules/dashboard/models/order.model';

const DOOR_OPEN = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="120" height="120"><path fill="none" d="M0 0H24V24H0z"/>
<path d="M2 21v-2h2V4.835c0-.484.346-.898.821-.984l9.472-1.722c.326-.06.638.157.697.483.007.035.01.07.01.107v1.28L19 4c.552 0 1 .448 1 
1v14h2v2h-4V6h-3v15H2zM13 4.396L6 5.67V19h7V4.396zM12 11v2h-2v-2h2z" fill="rgba(132,134,132,1)"/></svg>`;
const SHOPPING_CARD = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="120" height="120"><path fill="none" d="M0 0h24v24H0z"/>
<path d="M4 6.414L.757 3.172l1.415-1.415L5.414 5h15.242a1 1 0 0 1 .958 1.287l-2.4 8a1 1 0 0 1-.958.713H6v2h11v2H5a1 1 0 0 1-1-1V6.414zM6 
7v6h11.512l1.8-6H6zm-.5 16a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm12 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z" fill="rgba(132,134,132,1)"/></svg>`

@Component({
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.less']
})
export class InicioPage implements OnInit {

  tabs = ['First', 'Second', 'Third'];
  selected = 0;
  createdOrder: Order = new Order();
  orderToUpdate: Order | undefined
  userRole = ''

  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer, private storage: BusinessStorage, private router: Router) {
    iconRegistry.addSvgIconLiteral('door-open', sanitizer.bypassSecurityTrustHtml(DOOR_OPEN))
    iconRegistry.addSvgIconLiteral('shopping-cart', sanitizer.bypassSecurityTrustHtml(SHOPPING_CARD))
  }

  ngOnInit(): void {
    if (history.state.order) {
      this.orderToUpdate = history.state.order
      this.selected = 2
    }
    this.userRole = JSON.parse(this.storage.get(USER_INFO)).role
  }

  changeIndex(index: number) {
    if (index === 0)
      this.orderToUpdate = undefined
    this.selected = index
  }

  setOrder(orderCreated: Order) {
    this.createdOrder = orderCreated;
  }

}
