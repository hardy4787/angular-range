import { Component, OnInit } from '@angular/core';
import { AnimalService } from 'src/app/shared/services/animal.service';
import { PetService } from 'src/app/shared/services/pet.service';
import { ZooService } from './services/zoo.service';
import { ZooCopyService } from './services/zoo.service-copy';

@Component({
  templateUrl: './zoo-page.component.html',
  styleUrls: ['./zoo-page.component.scss'],
  providers: [
    {
      provide: ZooCopyService,
      useValue: {
        emoji: 'kasdas',
      },
    },
  ],
})
export class ZooPageComponent {
  constructor(
    readonly animalService: AnimalService,
    readonly petService: PetService
  ) {}
}
