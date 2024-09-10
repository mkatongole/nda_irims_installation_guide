import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClinicaltrialCasualityAssessmentComponent } from './clinicaltrial-casuality-assessment.component';

describe('ClinicaltrialCasualityAssessmentComponent', () => {
  let component: ClinicaltrialCasualityAssessmentComponent;
  let fixture: ComponentFixture<ClinicaltrialCasualityAssessmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClinicaltrialCasualityAssessmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClinicaltrialCasualityAssessmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
