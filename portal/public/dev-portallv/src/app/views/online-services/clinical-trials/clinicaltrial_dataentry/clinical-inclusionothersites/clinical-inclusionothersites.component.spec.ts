import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClinicalInclusionothersitesComponent } from './clinical-inclusionothersites.component';

describe('ClinicalInclusionothersitesComponent', () => {
  let component: ClinicalInclusionothersitesComponent;
  let fixture: ComponentFixture<ClinicalInclusionothersitesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClinicalInclusionothersitesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClinicalInclusionothersitesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
