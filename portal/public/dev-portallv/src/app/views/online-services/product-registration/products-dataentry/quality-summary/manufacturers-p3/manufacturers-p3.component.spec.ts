import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManufacturersP3Component } from './manufacturers-p3.component';

describe('ManufacturersP3Component', () => {
  let component: ManufacturersP3Component;
  let fixture: ComponentFixture<ManufacturersP3Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManufacturersP3Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManufacturersP3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
