import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BusinessStorage } from 'src/app/core/utils/business-storage';
import { USER_ROLE } from 'src/app/core/utils/constants';

@Component({
  selector: 'rp-layout-menu',
  templateUrl: './layout-menu.component.html',
  styleUrls: ['./layout-menu.component.less'],
})
export class LayoutMenuComponent implements OnInit {
  userRole = '';
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
    { name: 'Início', routerLink: 'inicio' },
  ]
  selectedOption: any;

  private _mobileQueryListener: () => void;

  fillerNav = Array.from({ length: 50 }, (_, i) => `Nav Item ${i + 1}`);

  constructor(
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    private router: Router,
    private storage: BusinessStorage
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addEventListener('change', this._mobileQueryListener);
  }
  ngOnInit(): void {
    this.userRole = this.storage.get(USER_ROLE);
    switch (this.router.url) {
      case '/menu/inicio':
        this.selectedOption = this.notAdminOptions[0]
        break;
      case '/menu/dashboard':
        this.selectedOption = this.adminOptions[0];
        break;
      case '/menu/dashboard/detail':
        if (this.storage.get(USER_ROLE) === 'Caixa') {
          this.selectedOption = this.notAdminOptions[0]
          return
        }
        this.selectedOption = this.adminOptions[0];
        break;
      case '/menu/caixa':
        this.selectedOption = this.adminOptions[1];
        break;
      case '/menu/clientes':
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
}
