import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClinicaltrialSaeReportComponent } from './clinicaltrial-sae-report.component';

describe('ClinicaltrialSaeReportComponent', () => {
  let component: ClinicaltrialSaeReportComponent;
  let fixture: ComponentFixture<ClinicaltrialSaeReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClinicaltrialSaeReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClinicaltrialSaeReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
