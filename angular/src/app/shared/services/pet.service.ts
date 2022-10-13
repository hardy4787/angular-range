import { Injectable } from '@angular/core';
import { AnimalService } from './animal.service';

@Injectable({
  providedIn: 'root',
})
export class PetService {
  constructor(readonly animalService: AnimalService) {}
}
