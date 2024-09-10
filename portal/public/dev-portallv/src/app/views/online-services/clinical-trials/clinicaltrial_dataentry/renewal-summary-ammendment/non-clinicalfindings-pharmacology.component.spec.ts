import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NonClinicalfindingsPharmacologyComponent } from './non-clinicalfindings-pharmacology.component';

describe('NonClinicalfindingsPharmacologyComponent', () => {
  let component: NonClinicalfindingsPharmacologyComponent;
  let fixture: ComponentFixture<NonClinicalfindingsPharmacologyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NonClinicalfindingsPharmacologyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NonClinicalfindingsPharmacologyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
