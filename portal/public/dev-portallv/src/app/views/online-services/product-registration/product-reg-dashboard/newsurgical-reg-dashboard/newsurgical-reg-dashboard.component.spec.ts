import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsurgicalRegDashboardComponent } from './newsurgical-reg-dashboard.component';

describe('NewsurgicalRegDashboardComponent', () => {
  let component: NewsurgicalRegDashboardComponent;
  let fixture: ComponentFixture<NewsurgicalRegDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewsurgicalRegDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsurgicalRegDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
