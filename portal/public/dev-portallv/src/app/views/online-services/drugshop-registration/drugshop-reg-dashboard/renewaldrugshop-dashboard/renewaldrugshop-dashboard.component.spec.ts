import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RenewaldrugshopDashboardComponent } from './renewaldrugshop-dashboard.component';

describe('RenewaldrugshopDashboardComponent', () => {
  let component: RenewaldrugshopDashboardComponent;
  let fixture: ComponentFixture<RenewaldrugshopDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RenewaldrugshopDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RenewaldrugshopDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
