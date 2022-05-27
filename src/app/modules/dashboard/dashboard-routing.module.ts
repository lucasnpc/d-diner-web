import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardDetailPage } from './pages/dashboard-detail/dashboard-detail.page';
import { DashboardPage } from './pages/dashboard/dashboard.page';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: DashboardPage,
      },
      {
        path: 'detail',
        component: DashboardDetailPage,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
