import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdverseDrugReactionRequestComponent } from './adverse-drug-reaction-request.component';

describe('AdverseDrugReactionRequestComponent', () => {
  let component: AdverseDrugReactionRequestComponent;
  let fixture: ComponentFixture<AdverseDrugReactionRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdverseDrugReactionRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdverseDrugReactionRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
