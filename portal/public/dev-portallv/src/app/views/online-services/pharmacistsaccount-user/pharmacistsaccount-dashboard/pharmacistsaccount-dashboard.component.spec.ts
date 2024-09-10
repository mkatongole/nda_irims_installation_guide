import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PharmacistsaccountDashboardComponent } from './pharmacistsaccount-dashboard.component';

describe('PharmacistsaccountDashboardComponent', () => {
  let component: PharmacistsaccountDashboardComponent;
  let fixture: ComponentFixture<PharmacistsaccountDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PharmacistsaccountDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PharmacistsaccountDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
