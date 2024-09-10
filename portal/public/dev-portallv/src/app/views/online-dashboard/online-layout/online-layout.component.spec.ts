import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OnlineLayoutComponent } from './online-layout.component';

describe('OnlineLayoutComponent', () => {
  let component: OnlineLayoutComponent;
  let fixture: ComponentFixture<OnlineLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OnlineLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OnlineLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
