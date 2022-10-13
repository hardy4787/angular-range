import { InjectionToken } from '@angular/core';
import { AnimalService } from 'src/app/shared/services/animal.service';
import { AnimalServiceCopy } from 'src/app/shared/services/animal.service-copy';

export const ZOO = new InjectionToken<AnimalServiceCopy[]>('zoo');
// export const ZOO = new InjectionToken<AnimalService>('zoo');
