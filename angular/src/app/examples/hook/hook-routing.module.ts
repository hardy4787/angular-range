import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HookPageComponent } from './hook-page.component';

const routes: Routes = [
  {
    path: '',
    component: HookPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HookRoutingModule {}
