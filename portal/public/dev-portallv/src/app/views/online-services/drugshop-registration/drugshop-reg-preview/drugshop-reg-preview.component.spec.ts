import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DrugshopRegPreviewComponent } from './drugshop-reg-preview.component';

describe('DrugshopRegPreviewComponent', () => {
  let component: DrugshopRegPreviewComponent;
  let fixture: ComponentFixture<DrugshopRegPreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DrugshopRegPreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DrugshopRegPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
