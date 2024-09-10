import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PackagingSelectionComponent } from './packaging-selection.component';

describe('PackagingSelectionComponent', () => {
  let component: PackagingSelectionComponent;
  let fixture: ComponentFixture<PackagingSelectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PackagingSelectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PackagingSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
