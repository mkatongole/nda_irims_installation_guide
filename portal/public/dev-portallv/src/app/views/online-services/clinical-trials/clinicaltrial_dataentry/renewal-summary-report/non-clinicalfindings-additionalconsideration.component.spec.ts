import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NonClinicalfindingsAdditionalconsiderationComponent } from './non-clinicalfindings-additionalconsideration.component';

describe('NonClinicalfindingsAdditionalconsiderationComponent', () => {
  let component: NonClinicalfindingsAdditionalconsiderationComponent;
  let fixture: ComponentFixture<NonClinicalfindingsAdditionalconsiderationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NonClinicalfindingsAdditionalconsiderationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NonClinicalfindingsAdditionalconsiderationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
