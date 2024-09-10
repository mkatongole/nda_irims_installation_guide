import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PsurProdnotificationDashboardComponent } from './psur-prodnotification-dashboard.component';

describe('PsurProdnotificationDashboardComponent', () => {
  let component: PsurProdnotificationDashboardComponent;
  let fixture: ComponentFixture<PsurProdnotificationDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PsurProdnotificationDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PsurProdnotificationDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
