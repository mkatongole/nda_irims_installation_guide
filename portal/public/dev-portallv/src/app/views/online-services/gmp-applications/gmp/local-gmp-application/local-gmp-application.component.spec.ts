import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocalGmpApplicationComponent } from './local-gmp-application.component';

describe('LocalGmpApplicationComponent', () => {
  let component: LocalGmpApplicationComponent;
  let fixture: ComponentFixture<LocalGmpApplicationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocalGmpApplicationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocalGmpApplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
