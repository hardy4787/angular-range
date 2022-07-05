import { NgModule } from '@angular/core';
import { Router, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../shared/guards/auth.guard';
import { ToolbarComponent } from './toolbar.component';

const routes: Routes = [
  {
    path: '',
    component: ToolbarComponent,
    children: [
      {
        path: 'inspection',
        loadChildren: () =>
          import('../inspection/inspection.module').then(
            (m) => m.InspectionModule
          ),
        canActivate: [AuthGuard],
      },
      {
        path: 'account',
        loadChildren: () =>
          import('../account/account.module').then((m) => m.AccountModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ToolbarRoutingModule {}
