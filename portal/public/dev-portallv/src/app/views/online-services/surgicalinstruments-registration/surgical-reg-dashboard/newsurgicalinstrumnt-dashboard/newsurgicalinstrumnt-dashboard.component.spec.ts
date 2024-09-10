import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsurgicalinstrumntDashboardComponent } from './newsurgicalinstrumnt-dashboard.component';

describe('NewsurgicalinstrumntDashboardComponent', () => {
  let component: NewsurgicalinstrumntDashboardComponent;
  let fixture: ComponentFixture<NewsurgicalinstrumntDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewsurgicalinstrumntDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsurgicalinstrumntDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
