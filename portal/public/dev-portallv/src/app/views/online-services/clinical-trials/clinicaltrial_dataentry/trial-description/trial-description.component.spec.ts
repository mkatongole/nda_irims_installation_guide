import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrialDescriptionComponent } from './trial-description.component';

describe('TrialDescriptionComponent', () => {
  let component: TrialDescriptionComponent;
  let fixture: ComponentFixture<TrialDescriptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrialDescriptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrialDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
