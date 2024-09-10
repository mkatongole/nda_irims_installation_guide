import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VariationDetailsComponent } from './variation-details.component';

describe('VariationDetailsComponent', () => {
  let component: VariationDetailsComponent;
  let fixture: ComponentFixture<VariationDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VariationDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VariationDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
