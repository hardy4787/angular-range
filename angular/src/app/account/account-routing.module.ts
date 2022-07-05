import { NgModule } from '@angular/core';
import { Router, RouterModule, Routes } from '@angular/router';
import { LoginCardComponent } from './components/login-card/login-card.component';
import { RegistrationCardComponent } from './components/registration-card/registration-card.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginCardComponent,
  },
  {
    path: 'signup',
    component: RegistrationCardComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccountRoutingModule {}
