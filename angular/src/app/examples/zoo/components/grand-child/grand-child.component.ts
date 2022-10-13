import { Component, Host, OnInit, Optional } from '@angular/core';
import { AnimalService } from 'src/app/shared/services/animal.service';
import { ZooCopyService } from '../../services/zoo.service-copy';

@Component({
  selector: 'app-grand-child',
  templateUrl: './grand-child.component.html',
  styleUrls: ['./grand-child.component.scss'],
})
export class GrandChildComponent {
  constructor(
    readonly animalService: AnimalService,
    readonly zooCopyService: ZooCopyService
  ) {
    if (this.zooCopyService === null) {
      this.zooCopyService = {
        emoji: 'kek',
      };
    }
    console.log('ads');
  }
}
