import { NgModule } from '@angular/core';
import { Router, RouterModule, Routes } from '@angular/router';
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
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ToolbarRoutingModule {}
