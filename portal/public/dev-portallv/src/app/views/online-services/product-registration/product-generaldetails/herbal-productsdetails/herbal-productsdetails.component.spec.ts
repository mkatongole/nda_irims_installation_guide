import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HerbalProductsdetailsComponent } from './herbal-productsdetails.component';

describe('HerbalProductsdetailsComponent', () => {
  let component: HerbalProductsdetailsComponent;
  let fixture: ComponentFixture<HerbalProductsdetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HerbalProductsdetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HerbalProductsdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
