import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedSurgicalregistrationclassComponent } from './shared-surgicalregistrationclass.component';

describe('SharedSurgicalregistrationclassComponent', () => {
  let component: SharedSurgicalregistrationclassComponent;
  let fixture: ComponentFixture<SharedSurgicalregistrationclassComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SharedSurgicalregistrationclassComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SharedSurgicalregistrationclassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
