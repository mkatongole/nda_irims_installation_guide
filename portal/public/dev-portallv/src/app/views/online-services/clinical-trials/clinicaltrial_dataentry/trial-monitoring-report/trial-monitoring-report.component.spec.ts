import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrialMonitoringReportComponent } from './trial-monitoring-report.component';

describe('TrialMonitoringReportComponent', () => {
  let component: TrialMonitoringReportComponent;
  let fixture: ComponentFixture<TrialMonitoringReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrialMonitoringReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrialMonitoringReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
