import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ComprasPage } from './pages/compras/compras.page';

const routes: Routes = [
  {
    path: '',
    component: ComprasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComprasRoutingModule { }