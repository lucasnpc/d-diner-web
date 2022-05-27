import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { BusinessStorage } from 'src/app/core/utils/business-storage';
import { MenuItem } from 'src/app/modules/cardapio/models/menu-item.model';
import { CardapioService } from 'src/app/modules/cardapio/service/menu.service';

const SEARCH_BUTTON = `<svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M16.6667 28.3333C23.11 28.3333 28.3333 23.11 28.3333 16.6667C28.3333 10.2233 23.11 5 16.6667 5C10.2233 5 5 10.2233 5 16.6667C5 23.11 10.2233 28.3333 16.6667 28.3333Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M35 35L25 25" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`;

interface Desks {
  name: string;
}

@Component({
  selector: 'rp-add-inflow',
  templateUrl: './add-inflow.component.html',
  styleUrls: ['./add-inflow.component.less'],
})
export class AddInflowComponent implements OnInit {
  @ViewChild('search') searchBar: ElementRef | undefined;
  @ViewChild('select') selectedDesk: any;
  filled = false;
  itemIndex: number[] = [];
  itens: MenuItem[] = [];
  total: number = 0;

  desks: Desks[] = [
    { name: 'Mesa - Delivery' },
    { name: 'Mesa - Balcão' },
    { name: 'Mesa - 1' },
    { name: 'Mesa - 2' },
    { name: 'Mesa - 3' },
    { name: 'Mesa - 4' },
    { name: 'Mesa - 5' },
    { name: 'Mesa - 6' },
    { name: 'Mesa - 7' },
    { name: 'Mesa - 8' },
    { name: 'Mesa - 9' },
  ];

  constructor(
    iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer,
    private rest: CardapioService,
    private dialog: MatDialog,
    private storage: BusinessStorage
  ) {
    iconRegistry.addSvgIconLiteral(
      'search-button',
      sanitizer.bypassSecurityTrustHtml(SEARCH_BUTTON)
    );
  }

  ngOnInit(): void {
    this.rest.getItens(this.storage.get("businessCnpj")).subscribe((result) => {
      this.itens = result.data;
    });
  }

  focusSearchBar() {
    if (this.searchBar!.nativeElement.value == '') {
      this.filled = true;
    }
    this.searchBar!.nativeElement.focus();
  }

  applyFilter(event: Event) {
    //this.filter.emit(event);
  }
  openDialogInvoice() {
    const itensSelected = this.itens.filter(function (item) {
      return item.selected == true;
    });

    if (!itensSelected.length || this.selectedDesk.value == null) {
      return;
    }
    const num = itensSelected
      .map((x) => Number(x.price))
      .reduce((a, b) => a + b, 0);
    this.total = +num.toFixed(2);
  }
}
