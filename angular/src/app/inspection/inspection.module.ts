import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InspectionPageComponent } from './inspection-page.component';
import { ShowInspectionComponent } from './components/show-inspection/show-inspection.component';
import { AddEditInspectionComponent } from './components/add-edit-inspection/add-edit-inspection.component';
import { InspectionRoutingModule } from './inspection-routing.module';
import { SharedModule } from '../shared/shared.module';
import { InspectionApiService } from './services/inspection-api.service';

@NgModule({
  declarations: [
    InspectionPageComponent,
    ShowInspectionComponent,
    AddEditInspectionComponent,
  ],
  providers: [InspectionApiService],
  imports: [CommonModule, SharedModule, InspectionRoutingModule],
})
export class InspectionModule {}
