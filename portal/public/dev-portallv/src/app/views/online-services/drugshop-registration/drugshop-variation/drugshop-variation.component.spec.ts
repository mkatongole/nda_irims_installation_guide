import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DrugshopVariationComponent } from './drugshop-variation.component';

describe('DrugshopVariationComponent', () => {
  let component: DrugshopVariationComponent;
  let fixture: ComponentFixture<DrugshopVariationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DrugshopVariationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DrugshopVariationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
