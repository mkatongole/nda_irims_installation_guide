import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportlicenseApplicationDashboardComponent } from './importlicenseapplication-dashboard.component';


describe('ImportlicenseApplicationDashboardComponent', () => {
  let component: ImportlicenseApplicationDashboardComponent;
  let fixture: ComponentFixture<ImportlicenseApplicationDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImportlicenseApplicationDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportlicenseApplicationDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
