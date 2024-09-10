import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClinicaltrialOtherreportingComponent } from './clinicaltrial-otherreporting.component';

describe('ClinicaltrialOtherreportingComponent', () => {
  let component: ClinicaltrialOtherreportingComponent;
  let fixture: ComponentFixture<ClinicaltrialOtherreportingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClinicaltrialOtherreportingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClinicaltrialOtherreportingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
