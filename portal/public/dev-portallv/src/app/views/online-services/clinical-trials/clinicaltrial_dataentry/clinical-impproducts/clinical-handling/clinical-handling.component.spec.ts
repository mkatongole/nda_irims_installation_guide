import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClinicalHandlingComponent } from './clinical-handling.component';

describe('ClinicalHandlingComponent', () => {
  let component: ClinicalHandlingComponent;
  let fixture: ComponentFixture<ClinicalHandlingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClinicalHandlingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClinicalHandlingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
