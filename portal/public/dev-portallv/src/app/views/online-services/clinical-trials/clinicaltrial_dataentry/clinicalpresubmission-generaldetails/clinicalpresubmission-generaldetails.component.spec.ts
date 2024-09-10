import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClinicalpresubmissionGeneraldetailsComponent } from './clinicalpresubmission-generaldetails.component';

describe('ClinicalpresubmissionGeneraldetailsComponent', () => {
  let component: ClinicalpresubmissionGeneraldetailsComponent;
  let fixture: ComponentFixture<ClinicalpresubmissionGeneraldetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClinicalpresubmissionGeneraldetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClinicalpresubmissionGeneraldetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
