import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReferenceMaterialsComponent } from './reference-materials.component';

describe('ReferenceMaterialsComponent', () => {
  let component: ReferenceMaterialsComponent;
  let fixture: ComponentFixture<ReferenceMaterialsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReferenceMaterialsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReferenceMaterialsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
