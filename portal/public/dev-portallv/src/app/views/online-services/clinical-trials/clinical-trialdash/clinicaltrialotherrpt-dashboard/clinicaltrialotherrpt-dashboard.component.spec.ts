import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClinicaltrialotherrptDashboardComponent } from './clinicaltrialotherrpt-dashboard.component';

describe('ClinicaltrialotherrptDashboardComponent', () => {
  let component: ClinicaltrialotherrptDashboardComponent;
  let fixture: ComponentFixture<ClinicaltrialotherrptDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClinicaltrialotherrptDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClinicaltrialotherrptDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
