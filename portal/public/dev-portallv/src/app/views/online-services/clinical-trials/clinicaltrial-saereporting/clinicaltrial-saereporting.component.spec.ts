import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClinicaltrialSaereportingComponent } from './clinicaltrial-saereporting.component';

describe('ClinicaltrialSaereportingComponent', () => {
  let component: ClinicaltrialSaereportingComponent;
  let fixture: ComponentFixture<ClinicaltrialSaereportingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClinicaltrialSaereportingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClinicaltrialSaereportingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
