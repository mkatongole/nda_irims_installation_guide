import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SurgicalAnnexstoreDashboardComponent } from './surgical-annexstore-dashboard.component';

describe('SurgicalAnnexstoreDashboardComponent', () => {
  let component: SurgicalAnnexstoreDashboardComponent;
  let fixture: ComponentFixture<SurgicalAnnexstoreDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SurgicalAnnexstoreDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SurgicalAnnexstoreDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
