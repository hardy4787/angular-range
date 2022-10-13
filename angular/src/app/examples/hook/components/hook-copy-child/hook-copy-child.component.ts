import {
  ApplicationRef,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';

@Component({
  selector: 'app-hook-copy-child',
  templateUrl: './hook-copy-child.component.html',
  styleUrls: ['./hook-copy-child.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HookCopyChildComponent implements OnInit {
  count: number = 1;
  constructor(
    private readonly changeDetectorRef: ChangeDetectorRef,
    private readonly appRef: ApplicationRef
  ) {}

  ngOnInit(): void {
    // setInterval(() => {
    //   this.count++;
    // }, 1000);
  }

  ngOnChanges(): void {
    console.log('ngOnChanges', 'HookCopyChildComponent');
  }
}
