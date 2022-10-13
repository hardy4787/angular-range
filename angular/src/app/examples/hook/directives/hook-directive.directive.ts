import {
  AfterContentChecked,
  AfterContentInit,
  AfterViewChecked,
  AfterViewInit,
  Directive,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
} from '@angular/core';

@Directive({
  selector: '[appHookDirective]',
})
export class HookDirectiveDirective {
  @Input() lol: number;
  constructor() {
    console.log('constructor', 'HookDirectiveDirective');
  }
  ngOnChanges(): void {
    console.log('ngOnChanges', 'HookDirectiveDirective');
  }
  ngOnInit(): void {
    console.log('ngOnInit', 'HookDirectiveDirective');
  }
  ngAfterContentInit(): void {
    console.log('ngAfterContentInit', 'HookDirectiveDirective');
  }
  ngAfterContentChecked(): void {
    console.log('ngAfterContentChecked', 'HookDirectiveDirective');
  }
  ngAfterViewInit(): void {
    console.log('ngAfterViewInit', 'HookDirectiveDirective');
  }
  ngAfterViewChecked(): void {
    console.log('ngAfterViewChecked', 'HookDirectiveDirective');
  }
  ngOnDestroy(): void {
    console.log('ngOnDestroy', 'HookDirectiveDirective');
  }
}
