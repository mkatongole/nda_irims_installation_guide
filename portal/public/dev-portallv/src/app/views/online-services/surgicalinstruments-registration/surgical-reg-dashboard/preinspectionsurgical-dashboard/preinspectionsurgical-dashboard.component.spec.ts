import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreinspectionsurgicalDashboardComponent } from './preinspectionsurgical-dashboard.component';

describe('PreinspectionsurgicalDashboardComponent', () => {
  let component: PreinspectionsurgicalDashboardComponent;
  let fixture: ComponentFixture<PreinspectionsurgicalDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreinspectionsurgicalDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreinspectionsurgicalDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
