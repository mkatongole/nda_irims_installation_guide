import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportExportApprovedappDeclarationComponent } from './importexport-approvedappdeclaration.component';

describe('ImportExportApprovedappDeclarationComponent', () => {
  let component: ImportExportApprovedappDeclarationComponent;
  let fixture: ComponentFixture<ImportExportApprovedappDeclarationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImportExportApprovedappDeclarationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportExportApprovedappDeclarationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
