import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreinspectionGmpApplicationComponent } from './preinspection-gmp-application.component';

describe('PreinspectionGmpApplicationComponent', () => {
  let component: PreinspectionGmpApplicationComponent;
  let fixture: ComponentFixture<PreinspectionGmpApplicationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreinspectionGmpApplicationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreinspectionGmpApplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
