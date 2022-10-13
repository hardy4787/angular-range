import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-hook-grand-child',
  templateUrl: './hook-grand-child.component.html',
  styleUrls: ['./hook-grand-child.component.scss'],
})
export class HookGrandChildComponent {
  constructor() {}

  // ngOnChanges(): void {
  //   console.log('ngOnChanges', 'HookGrandChildComponent');
  // }

  // ngOnInit(): void {
  //   console.log('ngOnInit', 'HookGrandChildComponent');
  // }

  // ngAfterContentInit(): void {
  //   console.log('ngAfterContentInit', 'HookGrandChildComponent');
  // }

  // ngAfterContentChecked(): void {
  //   console.log('ngAfterContentChecked', 'HookGrandChildComponent');
  // }

  // ngAfterViewInit(): void {
  //   console.log('ngAfterViewInit', 'HookGrandChildComponent');
  // }

  // ngAfterViewChecked(): void {
  //   console.log('ngAfterViewChecked', 'HookGrandChildComponent');
  // }

  // ngOnDestroy(): void {
  //   console.log('ngOnDestroy', 'HookGrandChildComponent');
  // }
}
