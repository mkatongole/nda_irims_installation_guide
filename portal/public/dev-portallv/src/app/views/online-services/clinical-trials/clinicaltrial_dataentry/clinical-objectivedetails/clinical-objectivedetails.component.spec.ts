import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClinicalObjectivedetailsComponent } from './clinical-objectivedetails.component';

describe('ClinicalObjectivedetailsComponent', () => {
  let component: ClinicalObjectivedetailsComponent;
  let fixture: ComponentFixture<ClinicalObjectivedetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClinicalObjectivedetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClinicalObjectivedetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
