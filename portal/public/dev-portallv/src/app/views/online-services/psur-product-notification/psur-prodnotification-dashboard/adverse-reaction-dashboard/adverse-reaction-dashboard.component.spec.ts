import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdverseReactionDashboardComponent } from './adverse-reaction-dashboard.component';

describe('AdverseReactionDashboardComponent', () => {
  let component: AdverseReactionDashboardComponent;
  let fixture: ComponentFixture<AdverseReactionDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdverseReactionDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdverseReactionDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
