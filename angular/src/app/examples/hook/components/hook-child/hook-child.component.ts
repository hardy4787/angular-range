import {
  AfterContentChecked,
  AfterContentInit,
  AfterViewChecked,
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
} from '@angular/core';

@Component({
  selector: 'app-hook-child',
  templateUrl: './hook-child.component.html',
  styleUrls: ['./hook-child.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HookChildComponent {
  num: number = 15.45;
  @Input() kek: string;

  // constructor() {
  //   console.log('constructor');
  // }

  // ngOnChanges(): void {
  //   console.log('ngOnChanges');
  // }

  // ngOnInit(): void {
  //   console.log('ngOnInit');
  // }

  // ngAfterContentInit(): void {
  //   console.log('ngAfterContentInit');
  // }

  // ngAfterContentChecked(): void {
  //   console.log('ngAfterContentChecked');
  // }

  // ngAfterViewInit(): void {
  //   console.log('ngAfterViewInit');
  // }

  // ngAfterViewChecked(): void {
  //   console.log('ngAfterViewChecked');
  // }

  // ngOnDestroy(): void {
  //   console.log('ngOnDestroy');
  // }

  onClick(): void {
    console.log('alert');
    // this.changeDetectorRef.markForCheck();
  }

  onTransform(value: number): string {
    console.log('function');
    return value.toString().replace('.', ',');
  }
}
