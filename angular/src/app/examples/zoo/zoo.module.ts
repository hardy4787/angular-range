import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ZooRoutingModule } from './zoo-routing.module';
import { ZooPageComponent } from './zoo-page.component';
import { ChildComponent } from './components/child/child.component';
import { GrandChildComponent } from './components/grand-child/grand-child.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { AnimalService } from 'src/app/shared/services/animal.service';
import { MonkeyDirective } from './directives/monkey.directive';
import { ParrotModule } from './parrot/parrot.module';
import { RoosterModule } from './rooster/rooster.module';
import { ZOO } from './zoo';
import { CarrotDirective } from './directives/carrot.directive';
import { PetService } from 'src/app/shared/services/pet.service';
import { ZooService } from './services/zoo.service';

@NgModule({
  declarations: [
    ZooPageComponent,
    ChildComponent,
    GrandChildComponent,
    MonkeyDirective,
    CarrotDirective,
  ],
  imports: [
    ZooRoutingModule,
    RoosterModule,
    ParrotModule,
    SharedModule,
    CommonModule,
    MatToolbarModule,
  ],
  providers: [
    { provide: AnimalService, useValue: { emoji: '🦋' } },
    { provide: ZooService, useValue: { emoji: '🦋' } },
    PetService,
    { provide: ZOO, useValue: { emoji: '🦝' }, multi: true },
  ],
})
export class ZooModule {}
