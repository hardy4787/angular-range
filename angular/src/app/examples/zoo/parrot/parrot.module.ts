import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnimalService } from 'src/app/shared/services/animal.service';
import { AnimalServiceCopy } from 'src/app/shared/services/animal.service-copy';
import { ZOO } from '../zoo';
import { ParrotComponent } from './parrot.component';

@NgModule({
  declarations: [ParrotComponent],
  imports: [CommonModule],
  providers: [
    {
      provide: ZOO,
      useValue: {
        emoji: '🦜',
      },
      multi: true,
    },
  ],
})
export class ParrotModule {}
