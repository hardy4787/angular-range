import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { LoginCardComponent } from './components/login-card/login-card.component';
import { RegistrationCardComponent } from './components/registration-card/registration-card.component';
import { AccountRoutingModule } from './account-routing.module';

@NgModule({
  declarations: [LoginCardComponent, RegistrationCardComponent],
  imports: [CommonModule, SharedModule, AccountRoutingModule],
})
export class AccountModule {}
