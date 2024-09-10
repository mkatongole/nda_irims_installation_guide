import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivePharmaceuticalComponent } from './active-pharmaceutical.component';

describe('ActivePharmaceuticalComponent', () => {
  let component: ActivePharmaceuticalComponent;
  let fixture: ComponentFixture<ActivePharmaceuticalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActivePharmaceuticalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivePharmaceuticalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
