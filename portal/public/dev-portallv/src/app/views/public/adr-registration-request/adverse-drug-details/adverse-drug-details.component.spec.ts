import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdverseDrugDetailsComponent } from './adverse-drug-details.component';

describe('AdverseDrugDetailsComponent', () => {
  let component: AdverseDrugDetailsComponent;
  let fixture: ComponentFixture<AdverseDrugDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdverseDrugDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdverseDrugDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
