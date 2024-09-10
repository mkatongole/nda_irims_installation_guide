import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NonClinicalfindingsPharmacokinetiscComponent } from './non-clinicalfindings-pharmacokinetisc.component';

describe('NonClinicalfindingsPharmacokinetiscComponent', () => {
  let component: NonClinicalfindingsPharmacokinetiscComponent;
  let fixture: ComponentFixture<NonClinicalfindingsPharmacokinetiscComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NonClinicalfindingsPharmacokinetiscComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NonClinicalfindingsPharmacokinetiscComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
