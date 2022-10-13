import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { ExamplesPageComponent } from './examples-page.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ExamplesRoutingModule } from './examples-routing.module';
import { BetterLoggerService } from './trash/services/better-logger.service';

@NgModule({
  declarations: [ExamplesPageComponent],
  imports: [
    ExamplesRoutingModule,
    SharedModule,
    CommonModule,
    MatToolbarModule,
  ],
  providers: [BetterLoggerService],
})
export class ExamplesModule {}
