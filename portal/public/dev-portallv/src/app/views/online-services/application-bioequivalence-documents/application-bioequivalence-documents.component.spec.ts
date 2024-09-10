import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationBioequivalenceDocumentsComponent } from './application-bioequivalence-documents.component';

describe('ApplicationBioequivalenceDocumentsComponent', () => {
  let component: ApplicationBioequivalenceDocumentsComponent;
  let fixture: ComponentFixture<ApplicationBioequivalenceDocumentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApplicationBioequivalenceDocumentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicationBioequivalenceDocumentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
