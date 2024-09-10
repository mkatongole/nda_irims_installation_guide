import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocalgmpRegDashboardComponent } from './localgmp-reg-dashboard.component';

describe('LocalgmpRegDashboardComponent', () => {
  let component: LocalgmpRegDashboardComponent;
  let fixture: ComponentFixture<LocalgmpRegDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocalgmpRegDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocalgmpRegDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
