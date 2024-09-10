import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FinishedPharmaceuticalComponent } from './finished-pharmaceutical.component';

describe('FinishedPharmaceuticalComponent', () => {
  let component: FinishedPharmaceuticalComponent;
  let fixture: ComponentFixture<FinishedPharmaceuticalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinishedPharmaceuticalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinishedPharmaceuticalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
