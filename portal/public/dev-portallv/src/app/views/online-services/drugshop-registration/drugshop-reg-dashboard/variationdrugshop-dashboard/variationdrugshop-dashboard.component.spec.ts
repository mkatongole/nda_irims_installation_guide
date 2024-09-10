import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VariationdrugshopDashboardComponent } from './variationdrugshop-dashboard.component';

describe('VariationdrugshopDashboardComponent', () => {
  let component: VariationdrugshopDashboardComponent;
  let fixture: ComponentFixture<VariationdrugshopDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VariationdrugshopDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VariationdrugshopDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
