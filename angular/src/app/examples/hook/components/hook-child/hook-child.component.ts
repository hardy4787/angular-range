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
  @Input() property: string;
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

  ngOnInit(): void {
    console.log('ngOnInit', this.property);
  }

  ngOnChanges(): void {
    console.log('ngOnChanges', this.property);
  }

  onClick(): void {
    console.log('alert');
    // this.changeDetectorRef.markForCheck();
  }

  onTransform(value: number): string {
    console.log('function');
    return value.toString().replace('.', ',');
  }
}
