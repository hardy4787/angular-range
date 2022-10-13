import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactivePageComponent } from './reactive-page.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReactiveRoutingModule } from './reactive-routing.module';

@NgModule({
  declarations: [ReactivePageComponent],
  imports: [CommonModule, SharedModule, ReactiveRoutingModule],
})
export class ReactiveModule {}
