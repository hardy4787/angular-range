import { Component, OnInit } from '@angular/core';
import { mapTo, share, tap, timer } from 'rxjs';
import { LogInfo } from './models/lof-info.model';

@Component({
  selector: 'app-trash-page',
  templateUrl: './trash-page.component.html',
  styleUrls: ['./trash-page.component.scss'],
})
export class TrashPageComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    const pop = null;
    let kek1 = {
      ...pop,
      description: 'opa',
    } as LogInfo;
    console.log(kek1);
  }
}
