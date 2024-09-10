import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RenewalDrugshopPermitComponent } from './renewal-drugshop-permit.component';

describe('RenewalDrugshopPermitComponent', () => {
  let component: RenewalDrugshopPermitComponent;
  let fixture: ComponentFixture<RenewalDrugshopPermitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RenewalDrugshopPermitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RenewalDrugshopPermitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
