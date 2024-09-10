import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IntendedSurgicalmanufacturingComponent } from './intended-surgicalmanufacturing.component';

describe('IntendedSurgicalmanufacturingComponent', () => {
  let component: IntendedSurgicalmanufacturingComponent;
  let fixture: ComponentFixture<IntendedSurgicalmanufacturingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IntendedSurgicalmanufacturingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IntendedSurgicalmanufacturingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
