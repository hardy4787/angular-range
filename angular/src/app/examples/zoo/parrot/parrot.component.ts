import { Component, Inject, OnInit } from '@angular/core';
import { AnimalServiceCopy } from 'src/app/shared/services/animal.service-copy';
import { ZOO } from '../zoo';

@Component({
  selector: 'app-parrot',
  templateUrl: './parrot.component.html',
})
export class ParrotComponent {
  constructor(
    @Inject(ZOO) public zooList: AnimalServiceCopy[],
  ) {}
}
