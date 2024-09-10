import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClosureSystemComponent } from './closure-system.component';

describe('ClosureSystemComponent', () => {
  let component: ClosureSystemComponent;
  let fixture: ComponentFixture<ClosureSystemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClosureSystemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClosureSystemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
