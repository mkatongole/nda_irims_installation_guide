import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GmpPreinspectionGeneraldetailsComponent } from './gmp-preinspection-generaldetails.component';

describe('GmpPreinspectionGeneraldetailsComponent', () => {
  let component: GmpPreinspectionGeneraldetailsComponent;
  let fixture: ComponentFixture<GmpPreinspectionGeneraldetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GmpPreinspectionGeneraldetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GmpPreinspectionGeneraldetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
