import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnimalService } from 'src/app/shared/services/animal.service';
import { AnimalServiceCopy } from 'src/app/shared/services/animal.service-copy';
import { ZOO } from '../zoo';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [
    {
      provide: ZOO,
      useValue: {
        emoji: '🐓',
      },
      multi: true,
    },
  ],
})
export class RoosterModule {}
