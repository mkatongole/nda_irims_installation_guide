import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClinicalConcomitantDrugComponent } from './clinical-concomitant-drug.component';

describe('ClinicalConcomitantDrugComponent', () => {
  let component: ClinicalConcomitantDrugComponent;
  let fixture: ComponentFixture<ClinicalConcomitantDrugComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClinicalConcomitantDrugComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClinicalConcomitantDrugComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
