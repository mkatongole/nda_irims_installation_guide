import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreinspectionsurgicalRegistrationComponent } from './preinspectionsurgical-registration.component';

describe('PreinspectionsurgicalRegistrationComponent', () => {
  let component: PreinspectionsurgicalRegistrationComponent;
  let fixture: ComponentFixture<PreinspectionsurgicalRegistrationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreinspectionsurgicalRegistrationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreinspectionsurgicalRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
