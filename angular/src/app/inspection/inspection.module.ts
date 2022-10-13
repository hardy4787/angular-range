import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InspectionCardComponent } from './components/inspection-card/inspection-card.component';
import { InspectionRoutingModule } from './inspection-routing.module';
import { SharedModule } from '../shared/shared.module';
import { MatTableModule } from '@angular/material/table';
import { InspectionService } from './services/inspection.service';
import { InspectionTypeService } from './services/inspection-type.service';
import { InspectionPageComponent } from './inspection-page.component';

@NgModule({
  declarations: [InspectionPageComponent, InspectionCardComponent],
  providers: [InspectionService, InspectionTypeService],
  imports: [
    CommonModule,
    SharedModule,
    MatTableModule,
    InspectionRoutingModule,
  ],
})
export class InspectionModule {}
