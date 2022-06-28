import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolbarRoutingModule } from './toolbar-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ToolbarComponent } from './toolbar.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDialogModule } from '@angular/material/dialog';
import { LoginDialogComponent } from './components/login-dialog/login-dialog.component';

@NgModule({
  declarations: [ToolbarComponent, LoginDialogComponent],
  imports: [
    ToolbarRoutingModule,
    CommonModule,
    SharedModule,
    MatToolbarModule,
    MatDialogModule,
  ],
})
export class ToolbarModule {}
