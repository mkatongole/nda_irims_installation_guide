import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreinspectionRegDashboardComponent } from './preinspection-reg-dashboard.component';

describe('PreinspectionRegDashboardComponent', () => {
  let component: PreinspectionRegDashboardComponent;
  let fixture: ComponentFixture<PreinspectionRegDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreinspectionRegDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreinspectionRegDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
