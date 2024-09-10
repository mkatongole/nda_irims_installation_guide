import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StabilityP8Component } from './stability-p8.component';

describe('StabilityP8Component', () => {
  let component: StabilityP8Component;
  let fixture: ComponentFixture<StabilityP8Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StabilityP8Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StabilityP8Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
