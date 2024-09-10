import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IntendedManufacturingActivityComponent } from './intended-manufacturing-activity.component';

describe('IntendedManufacturingActivityComponent', () => {
  let component: IntendedManufacturingActivityComponent;
  let fixture: ComponentFixture<IntendedManufacturingActivityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IntendedManufacturingActivityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IntendedManufacturingActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
