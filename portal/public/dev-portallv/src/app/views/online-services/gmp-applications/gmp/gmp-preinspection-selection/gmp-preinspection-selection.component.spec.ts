import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GmpPreinspectionSelectionComponent } from './gmp-preinspection-selection.component';

describe('GmpPreinspectionSelectionComponent', () => {
  let component: GmpPreinspectionSelectionComponent;
  let fixture: ComponentFixture<GmpPreinspectionSelectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GmpPreinspectionSelectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GmpPreinspectionSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
