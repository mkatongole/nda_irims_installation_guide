import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdverseReactionReporterDetailsComponent } from './adverse-reaction-reporter-details.component';

describe('AdverseReactionReporterDetailsComponent', () => {
  let component: AdverseReactionReporterDetailsComponent;
  let fixture: ComponentFixture<AdverseReactionReporterDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdverseReactionReporterDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdverseReactionReporterDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
