import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RelocationSurgicalInstumentsRegistrationComponent } from './relocation-surgical-instuments-registration.component';

describe('RelocationSurgicalInstumentsRegistrationComponent', () => {
  let component: RelocationSurgicalInstumentsRegistrationComponent;
  let fixture: ComponentFixture<RelocationSurgicalInstumentsRegistrationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RelocationSurgicalInstumentsRegistrationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RelocationSurgicalInstumentsRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
