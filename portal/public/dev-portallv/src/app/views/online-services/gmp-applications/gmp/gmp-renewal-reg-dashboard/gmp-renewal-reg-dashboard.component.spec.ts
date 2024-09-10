import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GmpRenewalRegDashboardComponent } from './gmp-renewal-reg-dashboard.component';

describe('GmpRenewalRegDashboardComponent', () => {
  let component: GmpRenewalRegDashboardComponent;
  let fixture: ComponentFixture<GmpRenewalRegDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GmpRenewalRegDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GmpRenewalRegDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
