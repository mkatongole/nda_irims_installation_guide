import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClinicalStudydesignendpointsdetailsComponent } from './clinical-studydesignendpointsdetails.component';

describe('ClinicalStudydesignendpointsdetailsComponent', () => {
  let component: ClinicalStudydesignendpointsdetailsComponent;
  let fixture: ComponentFixture<ClinicalStudydesignendpointsdetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClinicalStudydesignendpointsdetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClinicalStudydesignendpointsdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
