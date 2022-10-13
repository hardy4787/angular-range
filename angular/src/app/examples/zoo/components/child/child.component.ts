import { Component, Inject, OnInit, Optional, Self } from '@angular/core';
import { AnimalService } from 'src/app/shared/services/animal.service';
import { AnimalServiceCopy } from 'src/app/shared/services/animal.service-copy';
import { ZooService } from '../../services/zoo.service';
import { ZooCopyService } from '../../services/zoo.service-copy';
import { ZOO } from '../../zoo';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.scss'],
  providers: [
    { provide: AnimalService, useValue: { emoji: '👨' } },
    { provide: ZooService, useValue: { emoji: '🍭' } },
    { provide: ZOO, useValue: { emoji: '🍭' }, multi: true },
  ],
  viewProviders: [
    { provide: AnimalService, useValue: { emoji: '✨' } },
    { provide: ZooService, useValue: { emoji: '🍭' } },
    {
      provide: ZooCopyService,
      useValue: {
        emoji: '12',
      },
    },
  ],
})
export class ChildComponent {
  constructor(
    readonly animalService: AnimalService,
    @Inject(ZOO) public zooList: AnimalServiceCopy[],
    @Self() @Optional() readonly zooService?: ZooService // @Inject(ZOO) public zooList: AnimalServiceCopy
  ) {
    if (this.zooService === null) {
      this.zooService = {
        emoji: '🍀',
      };
    }
  }
}
