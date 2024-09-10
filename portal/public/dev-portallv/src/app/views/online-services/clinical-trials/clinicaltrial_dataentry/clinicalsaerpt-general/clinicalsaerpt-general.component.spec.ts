import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClinicalsaerptGeneralComponent } from './clinicalsaerpt-general.component';

describe('ClinicalsaerptGeneralComponent', () => {
  let component: ClinicalsaerptGeneralComponent;
  let fixture: ComponentFixture<ClinicalsaerptGeneralComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClinicalsaerptGeneralComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClinicalsaerptGeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
