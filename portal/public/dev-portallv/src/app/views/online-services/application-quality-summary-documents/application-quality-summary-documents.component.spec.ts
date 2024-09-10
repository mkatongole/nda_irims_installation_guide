import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationQualitySummaryDocumentsComponent } from './application-quality-summary-documents.component';

describe('ApplicationQualitySummaryDocumentsComponent', () => {
  let component: ApplicationQualitySummaryDocumentsComponent;
  let fixture: ComponentFixture<ApplicationQualitySummaryDocumentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApplicationQualitySummaryDocumentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicationQualitySummaryDocumentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
