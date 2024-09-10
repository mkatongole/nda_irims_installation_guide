import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SurgicalRegDashboardComponent } from './surgical-reg-dashboard.component';

describe('SurgicalRegDashboardComponent', () => {
  let component: SurgicalRegDashboardComponent;
  let fixture: ComponentFixture<SurgicalRegDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SurgicalRegDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SurgicalRegDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
