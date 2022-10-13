import { Directive } from '@angular/core';
import { AnimalService } from 'src/app/shared/services/animal.service';
import { ZOO } from '../zoo';

@Directive({
  selector: '[appMonkey]',
  providers: [
    {
      provide: ZOO,
      useValue: { emoji: '🐵' },
      multi: true,
    },
  ],
})
export class MonkeyDirective {}
