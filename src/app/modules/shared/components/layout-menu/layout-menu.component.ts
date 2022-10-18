import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { BusinessStorage } from 'src/app/core/utils/business-storage';
import { CASHIER_ROUTE, CLIENTS_ROUTE, DASHBOARD_DETAIL_ROUTE, DASHBOARD_ROUTE, KITCHEN_ROUTE, USER_INFO } from 'src/app/core/utils/constants';
import { LOGOUT_ICON } from 'src/app/core/utils/icons';
import { LoginService } from 'src/app/modules/login/services/login.service';

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
