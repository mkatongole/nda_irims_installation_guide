import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContainerClosureSystemComponent } from './container-closure-system.component';

describe('ContainerClosureSystemComponent', () => {
  let component: ContainerClosureSystemComponent;
  let fixture: ComponentFixture<ContainerClosureSystemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContainerClosureSystemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContainerClosureSystemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
