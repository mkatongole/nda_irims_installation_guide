import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OnlinedashboardComponent } from './onlinedashboard.component';

describe('OnlinedashboardComponent', () => {
  let component: OnlinedashboardComponent;
  let fixture: ComponentFixture<OnlinedashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OnlinedashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OnlinedashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
