import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewVetgmpApplicationComponent } from './new-vetgmp-application.component';

describe('NewVetgmpApplicationComponent', () => {
  let component: NewVetgmpApplicationComponent;
  let fixture: ComponentFixture<NewVetgmpApplicationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewVetgmpApplicationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewVetgmpApplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
