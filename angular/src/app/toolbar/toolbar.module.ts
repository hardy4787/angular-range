import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolbarRoutingModule } from './toolbar-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ToolbarComponent } from './toolbar.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [ToolbarComponent],
  imports: [ToolbarRoutingModule, CommonModule, MatToolbarModule],
})
export class ToolbarModule {}
