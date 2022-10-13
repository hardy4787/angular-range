import { Directive } from '@angular/core';
import { AnimalService } from 'src/app/shared/services/animal.service';
import { ZooService } from '../services/zoo.service';
import { ZooCopyService } from '../services/zoo.service-copy';
import { ZOO } from '../zoo';

@Directive({
  selector: '[appCarrot]',
  providers: [
    {
      provide: ZOO,
      useValue: { emoji: '🥕' },
      multi: true,
    },
    {
      provide: ZooService,
      useValue: { emoji: '🥕' },
    },
    {
      provide: ZooCopyService,
      useValue: { emoji: '🥕' },
    },
  ],
})
export class CarrotDirective {}
