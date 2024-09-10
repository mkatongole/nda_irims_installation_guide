import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContainerClosureComponent } from './container-closure.component';

describe('ContainerClosureComponent', () => {
  let component: ContainerClosureComponent;
  let fixture: ComponentFixture<ContainerClosureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContainerClosureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContainerClosureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
