import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PremiserelocationRegistrationComponent } from './premiserelocation-registration.component';

describe('PremiserelocationRegistrationComponent', () => {
  let component: PremiserelocationRegistrationComponent;
  let fixture: ComponentFixture<PremiserelocationRegistrationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PremiserelocationRegistrationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PremiserelocationRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
