import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VetAppSelectionComponent } from './vet-app-selection.component';

describe('VetAppSelectionComponent', () => {
  let component: VetAppSelectionComponent;
  let fixture: ComponentFixture<VetAppSelectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VetAppSelectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VetAppSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
