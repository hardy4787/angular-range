import { NgModule } from '@angular/core';
import { Router, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../shared/guards/auth.guard';
import { ExamplesPageComponent } from './examples-page.component';

const routes: Routes = [
  {
    path: '',
    component: ExamplesPageComponent,
    children: [
      {
        path: 'zoo',
        loadChildren: () => import('./zoo/zoo.module').then((m) => m.ZooModule),
      },
      {
        path: 'trash',
        loadChildren: () =>
          import('./trash/trash.module').then((m) => m.TrashModule),
      },
      {
        path: 'hook',
        loadChildren: () =>
          import('./hook/hook.module').then((m) => m.HookModule),
      },
      {
        path: 'reactive',
        loadChildren: () =>
          import('./reactive/reactive.module').then((m) => m.ReactiveModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExamplesRoutingModule {}
