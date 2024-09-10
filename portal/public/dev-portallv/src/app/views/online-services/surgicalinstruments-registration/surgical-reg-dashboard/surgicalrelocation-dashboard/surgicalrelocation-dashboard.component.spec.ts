import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SurgicalrelocationDashboardComponent } from './surgicalrelocation-dashboard.component';

describe('SurgicalrelocationDashboardComponent', () => {
  let component: SurgicalrelocationDashboardComponent;
  let fixture: ComponentFixture<SurgicalrelocationDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SurgicalrelocationDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SurgicalrelocationDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
