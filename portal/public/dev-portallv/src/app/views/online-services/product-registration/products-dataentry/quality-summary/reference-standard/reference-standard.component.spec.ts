import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReferenceStandardComponent } from './reference-standard.component';

describe('ReferenceStandardComponent', () => {
  let component: ReferenceStandardComponent;
  let fixture: ComponentFixture<ReferenceStandardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReferenceStandardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReferenceStandardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
