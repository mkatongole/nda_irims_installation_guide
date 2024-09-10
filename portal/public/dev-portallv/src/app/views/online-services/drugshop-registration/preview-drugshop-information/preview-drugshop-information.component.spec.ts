import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewDrugshopInformationComponent } from './preview-drugshop-information.component';

describe('PreviewDrugshopInformationComponent', () => {
  let component: PreviewDrugshopInformationComponent;
  let fixture: ComponentFixture<PreviewDrugshopInformationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreviewDrugshopInformationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreviewDrugshopInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
