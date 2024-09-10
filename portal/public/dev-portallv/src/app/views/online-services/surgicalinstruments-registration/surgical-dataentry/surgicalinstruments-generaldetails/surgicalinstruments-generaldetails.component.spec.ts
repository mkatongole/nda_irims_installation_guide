import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SurgicalinstrumentsGeneraldetailsComponent } from './surgicalinstruments-generaldetails.component';

describe('SurgicalinstrumentsGeneraldetailsComponent', () => {
  let component: SurgicalinstrumentsGeneraldetailsComponent;
  let fixture: ComponentFixture<SurgicalinstrumentsGeneraldetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SurgicalinstrumentsGeneraldetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SurgicalinstrumentsGeneraldetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
