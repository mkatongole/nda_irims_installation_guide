import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PremiserelocationDashboardComponent } from './premiserelocation-dashboard.component';

describe('PremiserelocationDashboardComponent', () => {
  let component: PremiserelocationDashboardComponent;
  let fixture: ComponentFixture<PremiserelocationDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PremiserelocationDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PremiserelocationDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
