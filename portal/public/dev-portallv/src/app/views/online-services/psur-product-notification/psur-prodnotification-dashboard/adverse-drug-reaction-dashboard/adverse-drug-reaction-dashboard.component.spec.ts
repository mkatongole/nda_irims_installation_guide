import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdverseDrugReactionDashboardComponent } from './adverse-drug-reaction-dashboard.component';

describe('AdverseDrugReactionDashboardComponent', () => {
  let component: AdverseDrugReactionDashboardComponent;
  let fixture: ComponentFixture<AdverseDrugReactionDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdverseDrugReactionDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdverseDrugReactionDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
