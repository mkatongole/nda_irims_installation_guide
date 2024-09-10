import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlFppComponent } from './control-fpp.component';

describe('ControlFppComponent', () => {
  let component: ControlFppComponent;
  let fixture: ComponentFixture<ControlFppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ControlFppComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ControlFppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
