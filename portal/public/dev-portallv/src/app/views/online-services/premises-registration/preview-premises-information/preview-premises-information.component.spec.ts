import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewPremisesInformationComponent } from './preview-premises-information.component';

describe('PreviewPremisesInformationComponent', () => {
  let component: PreviewPremisesInformationComponent;
  let fixture: ComponentFixture<PreviewPremisesInformationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreviewPremisesInformationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreviewPremisesInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
