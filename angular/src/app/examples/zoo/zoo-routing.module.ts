import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ParrotComponent } from './parrot/parrot.component';
import { ZooPageComponent } from './zoo-page.component';

const routes: Routes = [
  {
    path: '',
    component: ZooPageComponent,
    children: [
      {
        path: 'parrot',
        component: ParrotComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ZooRoutingModule {}
