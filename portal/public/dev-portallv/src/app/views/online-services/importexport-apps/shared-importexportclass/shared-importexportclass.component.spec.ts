import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedImportexportclassComponent } from './SharedImportexportclassComponent';

describe('SharedImportexportclassComponent', () => {
  let component: SharedImportexportclassComponent;
  let fixture: ComponentFixture<SharedImportexportclassComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SharedImportexportclassComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SharedImportexportclassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
export { SharedImportexportclassComponent };

