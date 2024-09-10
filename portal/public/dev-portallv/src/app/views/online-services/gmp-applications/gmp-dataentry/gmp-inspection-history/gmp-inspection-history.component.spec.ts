import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GmpInspectionHistoryComponent } from './gmp-inspection-history.component';

describe('GmpInspectionHistoryComponent', () => {
  let component: GmpInspectionHistoryComponent;
  let fixture: ComponentFixture<GmpInspectionHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GmpInspectionHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GmpInspectionHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
