import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewSurgicalRegistrationComponent } from './new-surgical-registration.component';

describe('NewSurgicalRegistrationComponent', () => {
  let component: NewSurgicalRegistrationComponent;
  let fixture: ComponentFixture<NewSurgicalRegistrationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewSurgicalRegistrationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewSurgicalRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
