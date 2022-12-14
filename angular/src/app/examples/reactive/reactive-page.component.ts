import { Component, OnInit } from '@angular/core';
import {
  map,
  mergeMap,
  take,
  switchMap,
  timer,
  concatMap,
  fromEvent,
  interval,
  takeWhile,
  takeUntil,
  Subject,
  Observable,
  Subscription,
  combineLatest,
  forkJoin,
  zip,
  throwError,
  of,
  exhaustMap,
} from 'rxjs';

type Color = 'white' | 'green' | 'red' | 'blue' | 'yellow';
type Logo = 'fish' | 'dog' | 'bird' | 'cow';
@Component({
  templateUrl: './reactive-page.component.html',
  styleUrls: ['./reactive-page.component.scss'],
})
export class ReactivePageComponent {
  event1$ = interval(500);
  event2$ = interval(500);
  event3$ = interval(1500);
  event4$ = interval(3000);
  color$ = new Subject<Color>();
  logo$ = new Subject<Logo>();
  constructor() {}
  newSubscription: Subscription;
  count = 0;

  switchMap(): void {
    this.unsubscribe();
    this.newSubscription = fromEvent(document, 'click')
      .pipe(
        switchMap(() => {
          return interval(1000).pipe(takeWhile((value) => value < 5));
        })
      )
      .subscribe(console.log);
    // this.newSubscription = fromEvent(document, 'click')
    //   .pipe(map((a) => a))
    //   .subscribe((v) => console.log(`${v}` + 2));
  }

  concatMap(): void {
    this.unsubscribe();
    this.newSubscription = fromEvent(document, 'click')
      .pipe(
        concatMap(() => {
          return interval(1000).pipe(takeWhile((value) => value < 5));
        })
      )
      .subscribe(console.log);
  }

  exhaustMap(): void {
    this.unsubscribe();
    this.newSubscription = fromEvent(document, 'click')
      .pipe(
        exhaustMap(() => {
          return interval(1000).pipe(takeWhile((value) => value < 5));
        })
      )
      .subscribe(console.log);
  }

  mergeMap(): void {
    this.unsubscribe();
    this.newSubscription = fromEvent(document, 'click')
      .pipe(mergeMap(() => interval(1000)))
      .subscribe(console.log);
  }

  combineLatest(): void {
    this.unsubscribe();
    console.log('combineLatest');
    // this.newSubscription = combineLatest([this.color$, this.logo$]).subscribe(
    //   ([color, logo]) => console.log(`${color} shirt with ${logo}`)
    // );
    // this.triggerEvents();
    this.newSubscription = combineLatest([
      this.event1$.pipe(take(2)),
      this.event2$.pipe(
        take(2),
        map(() => {
          throw new Error('Valid token not returned');
        })
      ),
      this.event3$.pipe(take(2)),
      this.event4$.pipe(take(2)),
    ]).subscribe(([v1, v2, v3, v4]) =>
      console.log(`
    Timer One (Proj) Latest: ${v1},
    Timer Two (Proj) Latest: ${v2},
    Timer Three (Proj) Latest: ${v3},
    Timer Four (Proj) Latest: ${v4}`)
    );
  }

  zip(): void {
    this.unsubscribe();
    console.log('zip');
    // this.newSubscription = zip([this.color$, this.logo$]).subscribe(
    //   ([color, logo]) => console.log(`${color} shirt with ${logo}`)
    // );
    // this.triggerEvents();
    this.newSubscription = zip([
      this.event1$.pipe(take(2)),
      this.event2$.pipe(
        take(2),
        map(() => {
          throw new Error('Valid token not returned');
        })
      ),
      this.event3$.pipe(take(2)),
      this.event4$.pipe(take(2)),
    ]).subscribe(([v1, v2, v3, v4]) =>
      console.log(`
    Timer One (Proj) Latest: ${v1},
    Timer Two (Proj) Latest: ${v2},
    Timer Three (Proj) Latest: ${v3},
    Timer Four (Proj) Latest: ${v4}`)
    );
  }

  forkJoin(): void {
    this.unsubscribe();
    console.log('forkJoin');
    // this.newSubscription = forkJoin([this.color$, this.logo$]).subscribe(
    //   ([color, logo]) => console.log(`${color} shirt with ${logo}`)
    // );
    // this.triggerEvents();

    this.newSubscription = forkJoin([
      this.event1$.pipe(take(2)),
      this.event2$.pipe(
        take(2),
        map(() => {
          throw new Error('Valid token not returned');
        })
      ),
      this.event3$.pipe(take(2)),
      this.event4$.pipe(take(2)),
    ]).subscribe(([v1, v2, v3, v4]) =>
      console.log(`
    Timer One (Proj) Latest: ${v1},
    Timer Two (Proj) Latest: ${v2},
    Timer Three (Proj) Latest: ${v3},
    Timer Four (Proj) Latest: ${v4}`)
    );
  }

  triggerEvents() {
    this.color$.next('white');
    this.logo$.next('fish');

    this.color$.next('green');
    this.logo$.next('dog');
    this.logo$.next('fish');

    this.color$.next('red');
    this.logo$.next('bird');

    // this.color$.next('blue');
  }

  unsubscribe(): void {
    this.count = 0;
    this.newSubscription?.unsubscribe();
  }
  complete(): void {
    this.logo$.complete();
    this.color$.complete();
  }

  ngOnDestroy(): void {
    this.unsubscribe();
  }
}
