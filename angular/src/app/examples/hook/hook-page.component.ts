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
import { timer } from 'rxjs';

@Component({
  selector: 'app-hook-page',
  templateUrl: './hook-page.component.html',
  styleUrls: ['./hook-page.component.scss'],
})
export class HookPageComponent {
  kek: string = '2';
  property: string = '3';

  /**
   *
   */
  constructor(
    private readonly changeDetectorRef: ChangeDetectorRef,
    private readonly appRef: ApplicationRef
  ) {}

  ngOnInit(): void {
    // timer(1000).subscribe(() => (this.property = '5'));
  }

  onClick(): void {
    this.appRef.tick();
    this.changeDetectorRef.markForCheck();
    console.log('parent');
  }
}
