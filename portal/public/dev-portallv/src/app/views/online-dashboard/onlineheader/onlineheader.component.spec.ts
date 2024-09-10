import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OnlineheaderComponent } from './onlineheader.component';

describe('OnlineheaderComponent', () => {
  let component: OnlineheaderComponent;
  let fixture: ComponentFixture<OnlineheaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OnlineheaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OnlineheaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
