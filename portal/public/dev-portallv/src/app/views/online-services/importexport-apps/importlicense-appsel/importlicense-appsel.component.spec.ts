import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportLicenseappselComponent } from './importlicense-appsel.component';

describe('ImportLicenseappselComponent', () => {
  let component: ImportLicenseappselComponent;
  let fixture: ComponentFixture<ImportLicenseappselComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImportLicenseappselComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportLicenseappselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
