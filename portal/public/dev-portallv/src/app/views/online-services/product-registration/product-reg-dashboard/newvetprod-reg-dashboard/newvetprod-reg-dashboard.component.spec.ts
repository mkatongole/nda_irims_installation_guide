import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewvetprodRegDashboardComponent } from './newvetprod-reg-dashboard.component';

describe('NewvetprodRegDashboardComponent', () => {
  let component: NewvetprodRegDashboardComponent;
  let fixture: ComponentFixture<NewvetprodRegDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewvetprodRegDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewvetprodRegDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
