import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OthertrialStaffComponent } from './othertrial-staff.component';

describe('OthertrialStaffComponent', () => {
  let component: OthertrialStaffComponent;
  let fixture: ComponentFixture<OthertrialStaffComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OthertrialStaffComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OthertrialStaffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
