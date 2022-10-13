import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./toolbar/toolbar.module').then((m) => m.ToolbarModule),
  },
  {
    path: 'examples',
    loadChildren: () =>
      import('./examples/examples.module').then((m) => m.ExamplesModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
