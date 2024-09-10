import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportLicenseapplictionComponent } from './import-licenseapplication.component';

describe('ImportLicenseapplictionComponent', () => {
  let component: ImportLicenseapplictionComponent;
  let fixture: ComponentFixture<ImportLicenseapplictionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImportLicenseapplictionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportLicenseapplictionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
