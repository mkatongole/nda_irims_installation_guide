import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportexportApprovedappVCComponent } from './importexport-approvedappvc.component';

describe('ImportexportApprovedappVCComponent', () => {
  let component: ImportexportApprovedappVCComponent;
  let fixture: ComponentFixture<ImportexportApprovedappVCComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImportexportApprovedappVCComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportexportApprovedappVCComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
