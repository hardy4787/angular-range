import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReactivePageComponent } from './reactive-page.component';

const routes: Routes = [
  {
    path: '',
    component: ReactivePageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReactiveRoutingModule {}
