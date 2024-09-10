import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnexstoreDashboardComponent } from './annexstore-dashboard.component';

describe('AnnexstoreDashboardComponent', () => {
  let component: AnnexstoreDashboardComponent;
  let fixture: ComponentFixture<AnnexstoreDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnnexstoreDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnnexstoreDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
