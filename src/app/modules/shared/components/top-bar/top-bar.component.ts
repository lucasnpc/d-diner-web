import {
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

const SEARCH_BUTTON = `<svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M16.6667 28.3333C23.11 28.3333 28.3333 23.11 28.3333 16.6667C28.3333 10.2233 23.11 5 16.6667 5C10.2233 5 5 10.2233 5 16.6667C5 23.11 10.2233 28.3333 16.6667 28.3333Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M35 35L25 25" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`;

@Component({
  selector: 'rp-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.less'],
})
export class TopBarComponent implements OnInit {
  @ViewChild('search') searchBar: ElementRef | undefined;
  @Output() openDialog = new EventEmitter();
  @Output() filter = new EventEmitter();

  filled = false;

  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    iconRegistry.addSvgIconLiteral(
      'search-button',
      sanitizer.bypassSecurityTrustHtml(SEARCH_BUTTON)
    );
  }

  ngOnInit(): void { }

  focusSearchBar() {
    if (this.searchBar!.nativeElement.value == '') {
      this.filled = true;
    }
    this.searchBar!.nativeElement.focus();
  }

  addSomething() {
    this.openDialog.emit();
  }

  applyFilter(event: Event) {
    this.filter.emit(event);
  }
}
