import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FuncionariosPage } from './pages/funcionarios/funcionarios.page';

const routes: Routes = [
  {
    path: '',
    component: FuncionariosPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FuncionariosRoutingModule {}
