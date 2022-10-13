import {
  AfterContentChecked,
  AfterContentInit,
  AfterViewChecked,
  AfterViewInit,
  ApplicationRef,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnChanges,
  OnDestroy,
  OnInit,
} from '@angular/core';

@Component({
  selector: 'app-hook-page',
  templateUrl: './hook-page.component.html',
  styleUrls: ['./hook-page.component.scss'],
})
export class HookPageComponent {
  kek: string = '2';

  /**
   *
   */
  constructor(private readonly changeDetectorRef: ChangeDetectorRef, private readonly appRef: ApplicationRef) {}
  onClick(): void {
    this.appRef.tick();
    this.changeDetectorRef.markForCheck();
    console.log('parent');
  }
}
