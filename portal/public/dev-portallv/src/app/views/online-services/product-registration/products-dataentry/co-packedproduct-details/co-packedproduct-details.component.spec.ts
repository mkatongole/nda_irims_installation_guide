import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoPackedproductDetailsComponent } from './co-packedproduct-details.component';

describe('CoPackedproductDetailsComponent', () => {
  let component: CoPackedproductDetailsComponent;
  let fixture: ComponentFixture<CoPackedproductDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoPackedproductDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoPackedproductDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
