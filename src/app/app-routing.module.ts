import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutMenuComponent } from './modules/shared/components/layout-menu/layout-menu.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./modules/login/login.module').then((m) => m.LoginModule),
  },
  {
    path: 'menu',
    component: LayoutMenuComponent,
    children: [
      {
        path: 'mesas',
        loadChildren: () =>
          import('./modules/desks/desks.module').then((m) => m.DesksModule)
      },
      {
        path: 'cozinha',
        loadChildren: () =>
          import('./modules/kitchen/kitchen.module').then((m) => m.KitchenModule)
      },
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./modules/dashboard/dashboard.module').then(
            (m) => m.DashboardModule
          ),
      },
      {
        path: 'caixa',
        loadChildren: () =>
          import('./modules/caixa/caixa.module').then((m) => m.CaixaModule),
      },
      {
        path: 'clientes',
        loadChildren: () =>
          import('./modules/clientes/clientes.module').then(
            (m) => m.ClientesModule
          ),
      },
      {
        path: 'cardapio',
        loadChildren: () =>
          import('./modules/cardapio/cardapio.module').then(
            (m) => m.CardapioModule
          ),
      },
      {
        path: 'compras',
        loadChildren: () =>
          import('./modules/compras/compras.module').then((m) => m.ComprasModule),
      },
      {
        path: 'funcionarios',
        loadChildren: () =>
          import('./modules/funcionarios/funcionarios.module').then(
            (m) => m.FuncionariosModule
          ),
      },
      {
        path: 'fornecedores',
        loadChildren: () =>
          import('./modules/fornecedores/fornecedores.module').then((m) => m.FornecedoresModule)
      }
    ],
  },
  {
    path: 'cadastro',
    loadChildren: () =>
      import('./modules/cadastro/cadastro.module').then(
        (m) => m.CardapioModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
