import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdverseDrugOtherdetailsComponent } from './adverse-drug-otherdetails.component';

describe('AdverseDrugOtherdetailsComponent', () => {
  let component: AdverseDrugOtherdetailsComponent;
  let fixture: ComponentFixture<AdverseDrugOtherdetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdverseDrugOtherdetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdverseDrugOtherdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
