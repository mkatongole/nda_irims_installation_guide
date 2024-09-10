import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PsurProductnotificationDashboardComponent } from './psur-productnotification-dashboard.component';

describe('PsurProductnotificationDashboardComponent', () => {
  let component: PsurProductnotificationDashboardComponent;
  let fixture: ComponentFixture<PsurProductnotificationDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PsurProductnotificationDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PsurProductnotificationDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
