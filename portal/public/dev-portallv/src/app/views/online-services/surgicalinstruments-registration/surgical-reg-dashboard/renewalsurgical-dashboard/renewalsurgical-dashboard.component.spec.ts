import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RenewalsurgicalDashboardComponent } from './renewalsurgical-dashboard.component';

describe('RenewalsurgicalDashboardComponent', () => {
  let component: RenewalsurgicalDashboardComponent;
  let fixture: ComponentFixture<RenewalsurgicalDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RenewalsurgicalDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RenewalsurgicalDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
