import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RenewalSurgicalIntrumentsRegistrationComponent } from './renewal-surgical-intruments-registration.component';

describe('RenewalSurgicalIntrumentsRegistrationComponent', () => {
  let component: RenewalSurgicalIntrumentsRegistrationComponent;
  let fixture: ComponentFixture<RenewalSurgicalIntrumentsRegistrationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RenewalSurgicalIntrumentsRegistrationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RenewalSurgicalIntrumentsRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
