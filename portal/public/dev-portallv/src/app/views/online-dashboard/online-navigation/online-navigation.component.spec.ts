import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OnlineNavigationComponent } from './online-navigation.component';

describe('OnlineNavigationComponent', () => {
  let component: OnlineNavigationComponent;
  let fixture: ComponentFixture<OnlineNavigationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OnlineNavigationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OnlineNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
