import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClinicalsotherrptGeneralComponent } from './clinicalsotherrpt-general.component';

describe('ClinicalsotherrptGeneralComponent', () => {
  let component: ClinicalsotherrptGeneralComponent;
  let fixture: ComponentFixture<ClinicalsotherrptGeneralComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClinicalsotherrptGeneralComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClinicalsotherrptGeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
