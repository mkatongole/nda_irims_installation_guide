import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClinicaltrialsaerptDashboardComponent } from './clinicaltrialsaerpt-dashboard.component';

describe('ClinicaltrialsaerptDashboardComponent', () => {
  let component: ClinicaltrialsaerptDashboardComponent;
  let fixture: ComponentFixture<ClinicaltrialsaerptDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClinicaltrialsaerptDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClinicaltrialsaerptDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
