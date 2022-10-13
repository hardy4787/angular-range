import { Component, OnInit } from '@angular/core';
import { mapTo, share, tap, timer } from 'rxjs';

@Component({
  selector: 'app-trash-page',
  templateUrl: './trash-page.component.html',
  styleUrls: ['./trash-page.component.scss'],
})
export class TrashPageComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    const source$ = timer(1000);
    const example$ = source$.pipe(
      tap(() => console.log('***SIDE EFFECT***')),
      mapTo('***RESULT***')
    );

    // const subscribe = example$.subscribe(val => console.log(val));
    // const subscribeTwo = example$.subscribe(val => console.log(val));
    const sharedExample$ = example$.pipe(share());
    /*
  ***SHARED, SIDE EFFECT EXECUTED ONCE***
  output:
  "***SIDE EFFECT***"
  "***RESULT***"
  "***RESULT***"
*/
    const subscribeThree = sharedExample$.subscribe((val) => console.log(val));
    const subscribeFour = sharedExample$.subscribe((val) => console.log(val));
  }
}
