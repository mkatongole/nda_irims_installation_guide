import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OnlinefooterComponent } from './onlinefooter.component';

describe('OnlinefooterComponent', () => {
  let component: OnlinefooterComponent;
  let fixture: ComponentFixture<OnlinefooterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OnlinefooterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OnlinefooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
