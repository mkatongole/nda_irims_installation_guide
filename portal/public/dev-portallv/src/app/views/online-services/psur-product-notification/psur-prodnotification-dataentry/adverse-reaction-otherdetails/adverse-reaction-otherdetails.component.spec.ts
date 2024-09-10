import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdverseReactionOtherdetailsComponent } from './adverse-reaction-otherdetails.component';

describe('AdverseReactionOtherdetailsComponent', () => {
  let component: AdverseReactionOtherdetailsComponent;
  let fixture: ComponentFixture<AdverseReactionOtherdetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdverseReactionOtherdetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdverseReactionOtherdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
