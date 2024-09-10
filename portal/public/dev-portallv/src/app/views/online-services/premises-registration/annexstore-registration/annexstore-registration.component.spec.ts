import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnexstoreRegistrationComponent } from './annexstore-registration.component';

describe('AnnexstoreRegistrationComponent', () => {
  let component: AnnexstoreRegistrationComponent;
  let fixture: ComponentFixture<AnnexstoreRegistrationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnnexstoreRegistrationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnnexstoreRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
