import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdverseReactionGeneralDetailsComponent } from './adverse-reaction-general-details.component';

describe('AdverseReactionGeneralDetailsComponent', () => {
  let component: AdverseReactionGeneralDetailsComponent;
  let fixture: ComponentFixture<AdverseReactionGeneralDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdverseReactionGeneralDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdverseReactionGeneralDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
