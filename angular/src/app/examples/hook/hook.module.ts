import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HookPageComponent } from './hook-page.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { HookRoutingModule } from './hook-routing.module';
import { HookChildComponent } from './components/hook-child/hook-child.component';
import { HookDirectiveDirective } from './directives/hook-directive.directive';
import { FormatPipe } from './pipes/format.pipe';
import { HookGrandChildComponent } from './components/hook-grand-child/hook-grand-child.component';
import { HookCopyChildComponent } from './components/hook-copy-child/hook-copy-child.component';

@NgModule({
  declarations: [HookPageComponent, HookChildComponent, HookDirectiveDirective, FormatPipe, HookGrandChildComponent, HookCopyChildComponent],
  imports: [CommonModule, HookRoutingModule, SharedModule],
})
export class HookModule {}
