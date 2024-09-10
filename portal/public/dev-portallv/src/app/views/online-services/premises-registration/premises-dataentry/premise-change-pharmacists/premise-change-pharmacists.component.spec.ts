import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PremiseChangePharmacistsComponent } from './premise-change-pharmacists.component';

describe('PremiseChangePharmacistsComponent', () => {
  let component: PremiseChangePharmacistsComponent;
  let fixture: ComponentFixture<PremiseChangePharmacistsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PremiseChangePharmacistsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PremiseChangePharmacistsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
