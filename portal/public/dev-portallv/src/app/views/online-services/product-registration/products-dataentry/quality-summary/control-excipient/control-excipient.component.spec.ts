import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlExcipientComponent } from './control-excipient.component';

describe('ControlExcipientComponent', () => {
  let component: ControlExcipientComponent;
  let fixture: ComponentFixture<ControlExcipientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ControlExcipientComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ControlExcipientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
