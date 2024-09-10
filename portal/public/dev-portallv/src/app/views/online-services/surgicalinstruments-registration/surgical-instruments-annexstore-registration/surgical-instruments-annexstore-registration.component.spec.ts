import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SurgicalInstrumentsAnnexstoreRegistrationComponent } from './surgical-instruments-annexstore-registration.component';

describe('SurgicalInstrumentsAnnexstoreRegistrationComponent', () => {
  let component: SurgicalInstrumentsAnnexstoreRegistrationComponent;
  let fixture: ComponentFixture<SurgicalInstrumentsAnnexstoreRegistrationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SurgicalInstrumentsAnnexstoreRegistrationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SurgicalInstrumentsAnnexstoreRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
