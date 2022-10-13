import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HookGrandChildComponent } from './hook-grand-child.component';

describe('HookGrandChildComponent', () => {
  let component: HookGrandChildComponent;
  let fixture: ComponentFixture<HookGrandChildComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HookGrandChildComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HookGrandChildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
