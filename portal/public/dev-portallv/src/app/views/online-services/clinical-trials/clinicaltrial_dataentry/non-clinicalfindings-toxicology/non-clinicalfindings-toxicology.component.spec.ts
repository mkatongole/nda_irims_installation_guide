import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NonClinicalfindingsToxicologyComponent } from './non-clinicalfindings-toxicology.component';

describe('NonClinicalfindingsToxicologyComponent', () => {
  let component: NonClinicalfindingsToxicologyComponent;
  let fixture: ComponentFixture<NonClinicalfindingsToxicologyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NonClinicalfindingsToxicologyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NonClinicalfindingsToxicologyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
