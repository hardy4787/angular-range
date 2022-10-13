import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { SharedModule } from 'src/app/shared/shared.module';
import { TrashRoutingModule } from './trash-routing.module';
import { TrashPageComponent } from './trash-page.component';
import { KekComponent } from '../components/kek/kek.component';
import { SearchPipe } from './pipes/search.pipe';

@NgModule({
  declarations: [TrashPageComponent, KekComponent, SearchPipe],
  imports: [TrashRoutingModule, SharedModule, CommonModule, MatToolbarModule],
})
export class TrashModule {}
