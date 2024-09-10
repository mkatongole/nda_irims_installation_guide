import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClinicalEndpointsdetailsComponent } from './clinical-endpointsdetails.component';

describe('ClinicalEndpointsdetailsComponent', () => {
  let component: ClinicalEndpointsdetailsComponent;
  let fixture: ComponentFixture<ClinicalEndpointsdetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClinicalEndpointsdetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClinicalEndpointsdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
