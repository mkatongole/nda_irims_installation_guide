import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PsurProdnotificationGeneraldetailsComponent } from './psur-prodnotification-generaldetails.component';

describe('PsurProdnotificationGeneraldetailsComponent', () => {
  let component: PsurProdnotificationGeneraldetailsComponent;
  let fixture: ComponentFixture<PsurProdnotificationGeneraldetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PsurProdnotificationGeneraldetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PsurProdnotificationGeneraldetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
