import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdrReportingRequestComponent } from './adr-reporting-request.component';

describe('AdrReportingRequestComponent', () => {
  let component: AdrReportingRequestComponent;
  let fixture: ComponentFixture<AdrReportingRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdrReportingRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdrReportingRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
