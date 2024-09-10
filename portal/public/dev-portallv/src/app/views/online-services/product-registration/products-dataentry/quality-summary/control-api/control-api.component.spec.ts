import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlApiComponent } from './control-api.component';

describe('ControlApiComponent', () => {
  let component: ControlApiComponent;
  let fixture: ComponentFixture<ControlApiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ControlApiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ControlApiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
