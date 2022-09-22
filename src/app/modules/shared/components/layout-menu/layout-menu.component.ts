import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { BusinessStorage } from 'src/app/core/utils/business-storage';
import { CASHIER_ROUTE, CLIENTS_ROUTE, DASHBOARD_DETAIL_ROUTE, DASHBOARD_ROUTE, KITCHEN_ROUTE, USER_INFO } from 'src/app/core/utils/constants';
import { LoginService } from 'src/app/modules/login/services/login.service';

const LOGOUT_ICON = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="48" height="48"><path fill="none" d="M0 0h24v24H0z"/>
<path d="M4 18h2v2h12V4H6v2H4V3a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-3zm2-7h7v2H6v3l-5-4 5-4v3z" fill="rgba(231,76,60,1)"/></svg>`

@Component({
  selector: 'rp-layout-menu',
  templateUrl: './layout-menu.component.html',
  styleUrls: ['./layout-menu.component.less'],
})
export class LayoutMenuComponent implements OnInit {
  userRole = this.storage.get(USER_INFO).role

  mobileQuery: MediaQueryList;
  adminOptions = [
    { name: 'Dashboard', routerLink: 'dashboard' },
    { name: 'Caixa', routerLink: 'caixa' },
    { name: 'Clientes', routerLink: 'clientes' },
    { name: 'Cardápio', routerLink: 'cardapio' },
    { name: 'Compras', routerLink: 'compras' },
    { name: 'Funcionários', routerLink: 'funcionarios' },
    { name: 'Fornecedores', routerLink: 'fornecedores' },
  ];
  notAdminOptions = [
    { name: 'Cozinha', routerLink: 'cozinha' }
  ]
  selectedOption: any;

  private _mobileQueryListener: () => void;

  fillerNav = Array.from({ length: 50 }, (_, i) => `Nav Item ${i + 1}`);

  constructor(
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    private router: Router,
    private storage: BusinessStorage,
    iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer,
    private loginService: LoginService
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addEventListener('change', this._mobileQueryListener);
    iconRegistry.addSvgIconLiteral(
      'logout-icon',
      sanitizer.bypassSecurityTrustHtml(LOGOUT_ICON)
    );
  }
  ngOnInit(): void {
    switch (this.router.url) {
      case KITCHEN_ROUTE:
        this.selectedOption = this.notAdminOptions[0]
        break;
      case DASHBOARD_ROUTE:
        this.selectedOption = this.adminOptions[0];
        break;
      case DASHBOARD_DETAIL_ROUTE:
        if (this.userRole === 'Caixa') {
          this.selectedOption = this.notAdminOptions[0]
          return
        }
        this.selectedOption = this.adminOptions[0];
        break;
      case CASHIER_ROUTE:
        this.selectedOption = this.adminOptions[1];
        break;
      case CLIENTS_ROUTE:
        this.selectedOption = this.adminOptions[2];
        break;
      case '/menu/cardapio':
        this.selectedOption = this.adminOptions[3];
        break;
      case '/menu/compras':
        this.selectedOption = this.adminOptions[4];
        break;
      case '/menu/funcionarios':
        this.selectedOption = this.adminOptions[5];
        break;
      case '/menu/fornecedores':
        this.selectedOption = this.adminOptions[6];
        break;
    }
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeEventListener('change', this._mobileQueryListener);
  }

  clickEvent(opt: any) {
    this.selectedOption = opt;
  }

  logoutUser() {
    this.loginService.logoutUser()
    this.router.navigate([''])
  }
}
