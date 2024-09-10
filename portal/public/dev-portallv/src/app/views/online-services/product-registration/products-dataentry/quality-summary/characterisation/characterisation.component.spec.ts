import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterisationComponent } from './characterisation.component';

describe('CharacterisationComponent', () => {
  let component: CharacterisationComponent;
  let fixture: ComponentFixture<CharacterisationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CharacterisationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CharacterisationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
